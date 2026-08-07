export const useTTS = () => {
  const speak = (text, lang = 'hi-IN') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop prior audio
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Audio speech synthesis is not supported offline on this browser. Please use Google Chrome.');
    }
  };
  return { speak };
};
