import './styles/TickerStrip.css';

const SEGMENT = 'AI Engineer · Full Stack Developer · Machine Learning · RAG Systems · LLM Pipelines · Open to Opportunities · Python · React · LangChain · Agentic AI · HuggingFace Contributor · Merged PR @ huggingface_hub · PR under review @ pytorch/torchtune · PR under review @ marimo (YC) · FAISS · Computer Vision · Springer Author · ';

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
