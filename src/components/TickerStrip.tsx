import './styles/TickerStrip.css';

const SEGMENT = 'AI Engineer · Full Stack Developer · Machine Learning · RAG Systems · LLM Pipelines · Open to Opportunities · Python · React · LangChain · Agentic AI · Open Source · Meta PyTorch · FAISS · Computer Vision · Springer Author · ';

export default function TickerStrip({ reverse }: { reverse?: boolean }) {
  const doubled = SEGMENT + SEGMENT;
  return (
    <div className={`ticker-strip${reverse ? ' ticker-strip-reverse' : ''}`}>
      <div className={`ticker-track${reverse ? ' ticker-track-reverse' : ''}`}>
        {doubled}
      </div>
    </div>
  );
}
