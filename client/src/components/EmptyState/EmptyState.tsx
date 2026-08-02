import './EmptyState.scss';

interface EmptyStateProps {
  title: string;
  text: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

function EmptyState({ title, text, buttonText, onButtonClick }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{'\uD83D\uDCC2'}</div>
      <h2>{title}</h2>
      <p>{text}</p>
      {buttonText && <button onClick={onButtonClick}>{buttonText}</button>}
    </div>
  );
}
export default EmptyState;
