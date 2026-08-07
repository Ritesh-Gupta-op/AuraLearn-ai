// 2PL Model: Probability of correct response
export function probabilityCorrect(theta, alpha, beta) {
  const exponent = -1.7 * alpha * (theta - beta);
  return 1.0 / (1.0 + Math.exp(exponent));
}

// Item Information Function
export function itemInformation(theta, alpha, beta) {
  const p = probabilityCorrect(theta, alpha, beta);
  return Math.pow(alpha, 2) * p * (1 - p);
}

// Newton-Raphson MAP Update (combines prior N(0,1) with likelihood)
export function estimateTheta(attempts, priorMean = 0, priorVariance = 1) {
  let theta = 0.0; // Initial guess
  let iterations = 10;
  for (let iter = 0; iter < iterations; iter++) {
    let dL = 0; // First derivative
    let d2L = 0; // Second derivative
    for (const att of attempts) {
      const alpha = att.alpha || att.discrimination_alpha || 1.0;
      const beta = att.beta || att.difficulty_beta || 0.0;
      const p = probabilityCorrect(theta, alpha, beta);
      const residual = att.isCorrect ? 1 - p : -p;
      // Derivative of log-likelihood w.r.t theta
      const d = 1.7 * alpha * residual;
      const d2 = -Math.pow(1.7 * alpha, 2) * p * (1 - p);
      dL += d;
      d2L += d2;
    }
    // Add MAP prior derivative
    dL -= (theta - priorMean) / priorVariance;
    d2L -= 1 / priorVariance;
    // Newton step
    const step = -dL / d2L;
    theta = theta + step;
    if (Math.abs(step) < 0.001) break;
  }
  return theta;
}

// Select next question (Maximum Information at current theta + epsilon exploration)
export function selectNextQuestion(theta, questionBank, exploredIds = []) {
  let bestQ = null;
  let maxInfo = -Infinity;
  // Exploration factor: 20% chance to pick random to prevent cold-start
  if (Math.random() < 0.2 && questionBank.length > 5) {
    const filtered = questionBank.filter(q => !exploredIds.includes(q.id));
    if (filtered.length > 0) {
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
  }
  for (const q of questionBank) {
    if (exploredIds.includes(q.id)) continue;
    const alpha = q.alpha || q.discrimination_alpha || 1.0;
    const beta = q.beta || q.difficulty_beta || 0.0;
    const info = itemInformation(theta, alpha, beta);
    if (info > maxInfo) {
      maxInfo = info;
      bestQ = q;
    }
  }
  return bestQ || questionBank[0];
}
