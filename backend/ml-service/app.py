from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'ml-service'})

@app.route('/predict', methods=['POST'])
def bandit_select():
    data = request.json
    if not data or 'questions' not in data:
        return jsonify({'error': 'Invalid payload, questions required'}), 400

    theta = data.get('theta', 0.0)
    questions = data.get('questions', [])

    if len(questions) == 0:
        return jsonify({'selected': None})

    # Thompson Sampling with Beta priors for exploration/exploitation
    selected = None
    max_score = -np.inf
    for q in questions:
        alpha = q.get('alpha', q.get('discrimination_alpha', 1.0))
        beta = q.get('beta', q.get('difficulty_beta', 0.0))
        # Simulate reward expectation using IRT + random noise
        prob = 1 / (1 + np.exp(-1.7 * alpha * (theta - beta)))
        # Sample from Beta distribution (simulate posterior)
        sample = np.random.beta(prob * 10 + 1, (1-prob) * 10 + 1)
        if sample > max_score:
            max_score = sample
            selected = q

    return jsonify({'selected': selected})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
