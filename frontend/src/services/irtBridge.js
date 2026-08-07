// Pure JS 2PL IRT bridge functions for client-side offline question selection

export function probabilityCorrect(theta, alpha, beta) {
  const exponent = -1.7 * alpha * (theta - beta);
  return 1.0 / (1.0 + Math.exp(exponent));
}

export function itemInformation(theta, alpha, beta) {
  const p = probabilityCorrect(theta, alpha, beta);
  return Math.pow(alpha, 2) * p * (1 - p);
}

export function estimateTheta(attempts, priorMean = 0, priorVariance = 1) {
  let theta = 0.0;
  let iterations = 10;
  for (let iter = 0; iter < iterations; iter++) {
    let dL = 0;
    let d2L = 0;
    for (const att of attempts) {
      const alpha = att.alpha || att.discrimination_alpha || 1.0;
      const beta = att.beta || att.difficulty_beta || 0.0;
      const p = probabilityCorrect(theta, alpha, beta);
      const residual = att.isCorrect ? 1 - p : -p;
      const d = 1.7 * alpha * residual;
      const d2 = -Math.pow(1.7 * alpha, 2) * p * (1 - p);
      dL += d;
      d2L += d2;
    }
    dL -= (theta - priorMean) / priorVariance;
    d2L -= 1 / priorVariance;
    const step = -dL / d2L;
    theta = theta + step;
    if (Math.abs(step) < 0.001) break;
  }
  return theta;
}

export function selectNextQuestion(theta, questionBank, exploredIds = []) {
  if (!questionBank || questionBank.length === 0) return null;
  let bestQ = null;
  let maxInfo = -Infinity;
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
