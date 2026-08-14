import './EmptyState.scss';

interface EmptyStateProps {
  title: string;
  text: string;
  buttonText?: string;
  onButtonClick?: () => void;
  testId?: string;
}

function EmptyState({ title, text, buttonText, onButtonClick, testId }: EmptyStateProps) {
  return (
    <div className="empty-state" data-testId={testId}>
      <div className="empty-icon">{'\uD83D\uDCC2'}</div>
      <h2 data-testId="empty-state-title">{title}</h2>
      <p data-testId="empty-state-text">{text}</p>
      {buttonText && <button onClick={onButtonClick}>{buttonText}</button>}
    </div>
  );
}
export default EmptyState;
