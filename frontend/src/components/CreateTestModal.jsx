import React, { useState } from 'react';
import { X, Plus, Trash2, Sparkles, Loader, AlertTriangle } from 'lucide-react';

async function geminiSuggestQuestion(subject, existingQuestions) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');

  const context = existingQuestions.length > 0
    ? `Already added questions:\n${existingQuestions.map((q, i) => `${i + 1}. ${q.text}`).join('\n')}\n\nNow generate one more unique question.`
    : 'Generate the first question for this test.';

  const prompt = `You are an expert ${subject} teacher creating a multiple-choice test question.
${context}

Return ONLY valid JSON (no markdown, no explanation) in this exact format:
{
  "text": "the question text here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option A",
  "difficulty": "medium"
}

The difficulty should be "easy", "medium", or "hard".`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
  const data = await res.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  // Strip markdown code blocks if present
  const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

export default function CreateTestModal({ onClose, onSave, classId }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [questions, setQuestions] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [saving, setSaving] = useState(false);

  const addBlankQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { text: '', options: ['', '', '', ''], correctAnswer: '', difficulty: 'medium' },
    ]);
  };

  const handleAISuggest = async () => {
    setAiError('');
    setAiLoading(true);
    try {
      const suggested = await geminiSuggestQuestion(subject, questions);
      setQuestions(prev => [...prev, {
        text: suggested.text,
        options: suggested.options,
        correctAnswer: suggested.correctAnswer,
        difficulty: suggested.difficulty || 'medium',
      }]);
    } catch (e) {
      console.error(e);
      if (e.message.includes('GEMINI_API_KEY')) {
        setAiError('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.');
      } else {
        setAiError('AI suggestion failed. Please try again or add a question manually.');
      }
    } finally {
      setAiLoading(false);
    }
  };

  const updateQuestion = (idx, field, value) => {
    setQuestions(prev => prev.map((q, i) => i === idx ? { ...q, [field]: value } : q));
  };

  const updateOption = (qIdx, optIdx, value) => {
    setQuestions(prev => prev.map((q, i) => {
      if (i !== qIdx) return q;
      const opts = [...q.options];
      opts[optIdx] = value;
      return { ...q, options: opts };
    }));
  };

  const removeQuestion = (idx) => {
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    if (questions.length === 0) return;

    const valid = questions.every(q => q.text && q.correctAnswer && q.options.every(o => o));
    if (!valid) {
      alert('Please fill in all question fields and mark a correct answer for each question.');
      return;
    }

    setSaving(true);
    try {
      await onSave({ title, subject, questions });
    } finally {
      setSaving(false);
    }
  };

  const DIFF_COLORS = { easy: '#4ade80', medium: '#fbbf24', hard: '#f87171' };
  const LETTERS = ['A', 'B', 'C', 'D'];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 660, maxHeight: '90vh', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#fff' }}>Create a New Test</h2>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
              Add questions manually or let AI suggest them
            </p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ padding: '8px', borderRadius: 10 }}>
            <X size={18} />
          </button>
        </div>

        {/* Test meta */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          <div>
            <label className="input-label">Test Title *</label>
            <input
              className="input"
              placeholder="e.g., Chapter 5 Algebra Quiz"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="input-label">Subject</label>
            <select
              className="input"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              {['Mathematics','Physics','Chemistry','Biology','History','Computer Science','English','Economics'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* AI Error */}
        {aiError && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 12, padding: '10px 14px', marginBottom: 16,
            display: 'flex', gap: 8, alignItems: 'flex-start',
            color: '#f87171', fontSize: '0.82rem'
          }}>
            <AlertTriangle size={14} style={{ marginTop: 2, flexShrink: 0 }} />
            <span>{aiError}</span>
          </div>
        )}

        {/* Add buttons */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <button
            className="btn btn-primary"
            onClick={handleAISuggest}
            disabled={aiLoading}
            style={{ flex: 1 }}
            id="btn-ai-suggest"
          >
            {aiLoading ? <><div className="spinner spinner-sm" />Generating…</> : <><Sparkles size={16} />AI Suggest Question</>}
          </button>
          <button
            className="btn btn-secondary"
            onClick={addBlankQuestion}
            id="btn-add-manual"
          >
            <Plus size={16} />Manual
          </button>
        </div>

        {/* Questions list */}
        {questions.length === 0 ? (
          <div style={{
            border: '1px dashed rgba(255,255,255,0.12)', borderRadius: 16, padding: '32px',
            textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem'
          }}>
            No questions yet. Click "AI Suggest Question" or add one manually.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {questions.map((q, qIdx) => (
              <div key={qIdx} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16, padding: 20, position: 'relative'
              }}>
                {/* Q header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Question {qIdx + 1}
                  </span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select
                      value={q.difficulty}
                      onChange={e => updateQuestion(qIdx, 'difficulty', e.target.value)}
                      style={{
                        background: 'transparent', border: `1px solid ${DIFF_COLORS[q.difficulty]}`,
                        color: DIFF_COLORS[q.difficulty], borderRadius: 8, padding: '4px 8px',
                        fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize'
                      }}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                    <button onClick={() => removeQuestion(qIdx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: 4 }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Question text */}
                <textarea
                  className="input"
                  placeholder="Enter question text…"
                  value={q.text}
                  onChange={e => updateQuestion(qIdx, 'text', e.target.value)}
                  rows={2}
                  style={{ resize: 'vertical', marginBottom: 12 }}
                />

                {/* Options */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <input
                        type="radio"
                        name={`correct-${qIdx}`}
                        id={`q${qIdx}-opt${optIdx}`}
                        checked={q.correctAnswer === opt && opt !== ''}
                        onChange={() => updateQuestion(qIdx, 'correctAnswer', opt)}
                        style={{ flexShrink: 0, accentColor: '#4ade80' }}
                      />
                      <label
                        htmlFor={`q${qIdx}-opt${optIdx}`}
                        style={{
                          fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                          flexShrink: 0, cursor: 'pointer'
                        }}
                      >{LETTERS[optIdx]}</label>
                      <input
                        className="input"
                        placeholder={`Option ${LETTERS[optIdx]}`}
                        value={opt}
                        onChange={e => updateOption(qIdx, optIdx, e.target.value)}
                        style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                      />
                    </div>
                  ))}
                </div>
                {q.correctAnswer && (
                  <p style={{ fontSize: '0.75rem', color: '#4ade80', marginTop: 8 }}>
                    ✓ Correct answer: <strong>{q.correctAnswer}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer actions */}
        {questions.length > 0 && (
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn btn-ghost" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving || !title.trim()}
              style={{ flex: 2 }}
              id="btn-save-test"
            >
              {saving ? <><div className="spinner spinner-sm" />Saving…</> : `✓ Save Test (${questions.length} Qs)`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
