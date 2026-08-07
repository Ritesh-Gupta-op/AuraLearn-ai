export const setupSocket = (io, dbPool) => {
  io.on('connection', (socket) => {
    console.log('Client connected to Socket.io:', socket.id);

    socket.on('join-class', (classId) => {
      socket.join(`class-${classId}`);
      console.log(`Socket ${socket.id} joined class-${classId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Scheduled job: Every 5 minutes, compute risk scores
  setInterval(async () => {
    try {
      if (!dbPool) return;
      const riskyStudents = await dbPool.query(`
        SELECT s.id, s."userId", s."currentTheta", MAX(a."createdAt") as "lastActive"
        FROM "Student" s
        JOIN "Attempt" a ON s.id = a."studentId"
        GROUP BY s.id
        HAVING s."currentTheta" < -0.5 AND MAX(a."createdAt") < NOW() - INTERVAL '3 days'
      `);
      // Emit to teachers in class-123
      io.to('class-123').emit('risk-alert', riskyStudents.rows || []);
    } catch (err) {
      console.error('Error calculating risk alerts:', err);
    }
  }, 300000); // 5 minutes
};
