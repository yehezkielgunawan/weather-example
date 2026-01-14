import type { FC } from "hono/jsx";

interface ErrorDisplayProps {
  title: string;
  message: string;
  showHomeLink?: boolean;
}

export const ErrorDisplay: FC<ErrorDisplayProps> = ({
  title,
  message,
  showHomeLink = true,
}) => {
  return (
    <div class="error-container">
      <div class="error-icon">⚠️</div>
      <h2 class="error-title">{title}</h2>
      <p class="error-message">{message}</p>
      {showHomeLink && (
        <a href="/" class="error-home-link">
          ← Back to Home
        </a>
      )}
    </div>
  );
};
