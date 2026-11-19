// Instrument Serif's "1" reads like an "l", so headings set digits in the sans face.
export function numerals(text: string) {
  return text.split(/(\d[\d,.]*)/).map((part, i) => (i % 2 ? <span key={i} className="v2-num">{part}</span> : part));
}

