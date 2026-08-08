import { Send, Sparkles, AlertTriangle, RefreshCw, BookOpen, Bot } from 'lucide-react';

async function callGemini(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('API_KEY_MISSING');

  // Try gemini-1.5-flash first, fallback to gemini-2.0-flash
  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-pro'];
  let lastErr = null;

  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }
      const errData = await res.json().catch(() => ({}));
      lastErr = errData.error?.message || `HTTP ${res.status}`;
    } catch (e) {
      lastErr = e.message;
    }
  }

  throw new Error(`Gemini API error: ${lastErr}`);
}

async function generateExplanation(topic) {
  return callGemini(
    `You are a friendly, expert tutor. Explain "${topic}" clearly and concisely for a student (in 4-6 sentences). Use simple language with a concrete example. Do not use markdown headers, just clean paragraphs.`
  );
}

async function generateQuestion(topic, difficulty) {
  const raw = await callGemini(
    `Generate a single multiple-choice practice question about "${topic}" at ${difficulty} difficulty level.
Return ONLY valid JSON (no markdown) in this exact format:
{
  "question": "the question text?",
  "options": ["A) option1", "B) option2", "C) option3", "D) option4"],
  "correctAnswer": "A) option1",
  "explanation": "Brief explanation of why this is correct."
}`
  );
  const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

export default function AITutor() {
  const [topic, setTopic] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [explanation, setExplanation] = useState('');
  const [expLoading, setExpLoading] = useState(false);
  const [expError, setExpError] = useState('');

  // Quiz state
  const [difficulty, setDifficulty] = useState('medium');
  const [question, setQuestion] = useState(null);
  const [qLoading, setQLoading] = useState(false);
  const [qError, setQError] = useState('');
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const handleSearch = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setTopic(trimmed);
    setExplanation('');
    setExpError('');
    setQuestion(null);
    setSelected(null);
    setSubmitted(false);
    setExpLoading(true);
    try {
      const text = await generateExplanation(trimmed);
      setExplanation(text);
    } catch (e) {
      console.error('Gemini explanation error:', e);
      if (e.message === 'API_KEY_MISSING') {
        setExpError('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to frontend/.env');
      } else {
        setExpError(e.message || 'Failed to get explanation.');
      }
    } finally {
      setExpLoading(false);
    }
  };

  const handlePractice = async () => {
    if (!topic) return;
    setQuestion(null);
    setSelected(null);
    setSubmitted(false);
    setQError('');
    setQLoading(true);
    try {
      const q = await generateQuestion(topic, difficulty);
      setQuestion(q);
    } catch (e) {
      if (e.message === 'API_KEY_MISSING') {
        setQError('Gemini API key not configured.');
      } else {
        setQError('Failed to generate question. Try again.');
      }
    } finally {
      setQLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    const correct = selected === question.correctAnswer;
    setScore(prev => ({ correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 }));
  };

  const handleNext = () => {
    handlePractice();
  };

  const DIFF_LABELS = { easy: '🟢 Easy', medium: '🟡 Medium', hard: '🔴 Hard' };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: 'rgba(26,37,64,0.08)', border: '1px solid rgba(26,37,64,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A2540'
        }}>
          <Bot size={26} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.4rem', color: '#1A2540', fontWeight: 900 }}>AI Tutor</h2>
          <p style={{ fontSize: '0.85rem', color: '#1A2540', opacity: 0.7 }}>
            Search any topic to learn & practice • Powered by Google Gemini
          </p>
        </div>
        {score.total > 0 && (
          <div style={{
            marginLeft: 'auto', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: 12, padding: '8px 16px', textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.65rem', color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Session Score</div>
            <div style={{ fontFamily: 'League Spartan', fontSize: '1.2rem', fontWeight: 900, color: '#4ade80' }}>
              {score.correct}/{score.total}
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        <input
          className="input"
          id="ai-tutor-search"
          placeholder="e.g., Pythagoras theorem, Newton's laws, Quadratic equations…"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, fontSize: '1rem', padding: '14px 18px' }}
        />
        <button
          className="btn btn-primary"
          onClick={handleSearch}
          disabled={expLoading || !inputValue.trim()}
          style={{ padding: '14px 22px' }}
          id="btn-ai-search"
        >
          {expLoading ? <div className="spinner spinner-sm" /> : <Sparkles size={18} />}
        </button>
      </div>

      {/* Explanation */}
      {expLoading && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div className="spinner" style={{ marginBottom: 16 }} />
          <p style={{ color: '#1A2540', opacity: 0.7, fontSize: '0.88rem' }}>Generating explanation for "{inputValue}"…</p>
        </div>
      )}

      {expError && (
        <div style={{
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 16, padding: 20, display: 'flex', gap: 12, marginBottom: 20,
          color: '#cc2b3f', fontSize: '0.88rem', alignItems: 'flex-start', fontWeight: 600
        }}>
          <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>{expError}</span>
        </div>
      )}

      {explanation && !expLoading && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <BookOpen size={16} style={{ color: '#cc2b3f' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#cc2b3f', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Explanation: {topic}
            </span>
          </div>
          <div className="card" style={{ padding: 20, lineHeight: 1.6, color: '#1A2540', fontSize: '0.95rem' }}>
            {explanation}
          </div>

          {/* Practice section */}
          <div className="card" style={{ marginTop: 20, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <p style={{ fontFamily: 'League Spartan', fontSize: '1.1rem', color: '#1A2540', fontWeight: 800 }}>
                  Practice Problems
                </p>
                <p style={{ fontSize: '0.82rem', color: '#1A2540', opacity: 0.7 }}>
                  Choose difficulty and generate a question
                </p>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['easy','medium','hard'].map(d => (
                  <button
                    key={d}
                    className={`diff-btn ${d} ${difficulty === d ? 'active' : ''}`}
                    onClick={() => setDifficulty(d)}
                    id={`btn-diff-${d}`}
                  >{DIFF_LABELS[d]}</button>
                ))}
              </div>
            </div>

            <button
              className="btn btn-secondary"
              onClick={handlePractice}
              disabled={qLoading}
              style={{ width: '100%', marginBottom: question ? 20 : 0 }}
              id="btn-generate-question"
            >
              {qLoading
                ? <><div className="spinner spinner-sm" />Generating question…</>
                : <><RefreshCw size={15} />Generate {difficulty} question</>
              }
            </button>

            {qError && (
              <p style={{ color: '#cc2b3f', fontSize: '0.85rem', marginTop: 8, fontWeight: 600 }}>{qError}</p>
            )}

            {/* Question display */}
            {question && !qLoading && (
              <div>
                <p style={{ fontSize: '1rem', color: '#1A2540', fontWeight: 700, lineHeight: 1.5, marginBottom: 16 }}>
                  {question.question}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  {question.options.map((opt, i) => {
                    let cls = 'answer-option';
                    if (submitted) {
                      if (opt === question.correctAnswer) cls += ' correct';
                      else if (opt === selected && opt !== question.correctAnswer) cls += ' wrong';
                    } else if (opt === selected) cls += ' selected';

                    return (
                      <button
                        key={i}
                        className={cls}
                        onClick={() => !submitted && setSelected(opt)}
                        disabled={submitted}
                      >
                        <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
                        {opt.replace(/^[A-D]\) /, '')}
                      </button>
                    );
                  })}
                </div>

                {!submitted ? (
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={handleSubmit}
                    disabled={!selected}
                    id="btn-submit-answer"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div>
                    {/* Result feedback */}
                    <div style={{
                      background: selected === question.correctAnswer ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      border: `1px solid ${selected === question.correctAnswer ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
                      borderRadius: 12, padding: '12px 16px', marginBottom: 12
                    }}>
                      <p style={{ fontWeight: 700, color: selected === question.correctAnswer ? '#4ade80' : '#f87171', marginBottom: 4 }}>
                        {selected === question.correctAnswer ? '🎉 Correct!' : '❌ Incorrect'}
                      </p>
                      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)' }}>
                        {question.explanation}
                      </p>
                    </div>
                    <button
                      className="btn btn-secondary"
                      style={{ width: '100%' }}
                      onClick={handleNext}
                      id="btn-next-question"
                    >
                      <RefreshCw size={15} /> Next Question
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!expLoading && !explanation && !expError && (
        <div style={{ textAlign: 'center', padding: '48px 24px', color: 'rgba(255,255,255,0.25)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ fontSize: '0.95rem' }}>Search a topic above to start learning</p>
          <p style={{ fontSize: '0.8rem', marginTop: 8 }}>
            Try: "Photosynthesis", "Newton's Second Law", "Binary search", "French Revolution"
          </p>
        </div>
      )}
    </div>
  );
}
