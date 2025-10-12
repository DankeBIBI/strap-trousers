import { css } from 'lit'

export const stFeatureTesterStyles = css`
  :host {
    display: block;
  }

  .feature-tester-container {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.25rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .feature-tester-header {
    margin-bottom: 1.25rem;
  }

  .feature-tester-title {
    margin: 0;
    margin-bottom: 0.625rem;
    font-size: 1.125rem;
    color: #1f2937;
  }

  .feature-tester-description {
    margin: 0;
    font-size: 0.875rem;
    color: #4b5563;
  }

  .button-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  @media (min-width: 640px) {
    .button-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .btn-test {
    padding: 0.75rem;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
  }

  .btn-test:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }

  .btn-test-title {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
    color: #1f2937;
    font-size: 0.875rem;
  }

  .btn-test-description {
    display: block;
    color: #6b7280;
    font-size: 0.75rem;
  }

  .results-container {
    margin-top: 1.25rem;
  }

  .results-title {
    margin-bottom: 0.75rem;
    font-size: 1rem;
    color: #1f2937;
  }

  .results-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .result-item {
    padding: 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid;
  }

  .result-item.success {
    background-color: #f0fdf4;
    border-color: #bbf7d0;
    color: #166534;
  }

  .result-item.error {
    background-color: #fef2f2;
    border-color: #fecaca;
    color: #b91c1c;
  }

  .result-item.info {
    background-color: #eff6ff;
    border-color: #bfdbfe;
    color: #1e40af;
  }

  .result-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.375rem;
  }

  .result-name {
    font-weight: 500;
    font-size: 0.875rem;
  }

  .result-status {
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .result-status.success {
    background-color: #bbf7d0;
    color: #166534;
  }

  .result-status.error {
    background-color: #fecaca;
    color: #b91c1c;
  }

  .result-status.info {
    background-color: #bfdbfe;
    color: #1e40af;
  }

  .result-message {
    margin: 0;
    font-size: 0.875rem;
  }

  .result-details {
    margin-top: 0.375rem;
    padding-top: 0.375rem;
    border-top: 1px solid;
    font-size: 0.75rem;
    opacity: 0.8;
  }

  .result-item.success .result-details {
    border-color: #bbf7d0;
  }

  .result-item.error .result-details {
    border-color: #fecaca;
  }

  .result-item.info .result-details {
    border-color: #bfdbfe;
  }

  .loading-message {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: #6b7280;
    font-size: 0.875rem;
  }

  .loading-spinner {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
    border: 2px solid #d1d5db;
    border-top: 2px solid #2563eb;
    border-radius: 9999px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`