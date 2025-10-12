import { css } from 'lit'

export const stApiTesterStyles = css`
  :host {
    display: block;
  }

  .container {
    display: flex;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  .form-section {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .code-section {
    flex: 1;
    min-width: 0;
    max-width: 600px;
  }

  .api-tester-container {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.25rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .api-tester-header {
    margin-bottom: 1.25rem;
  }

  .api-tester-title {
    margin: 0;
    margin-bottom: 0.625rem;
    font-size: 1.125rem;
    color: #1f2937;
  }

  .api-tester-description {
    margin: 0;
    font-size: 0.875rem;
    color: #4b5563;
  }

  /* 移除旧的不需要的样式 */
  .response-container,
  .response-title,
  .btn-copy {
    display: none;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.375rem;
    font-weight: 500;
    color: #1f2937;
    font-size: 0.875rem;
  }

  select,
  input,
  textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    background-color: white;
    transition: all 0.2s ease;
  }

  select {
    cursor: pointer;
  }

  select:focus,
  input:focus,
  textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  textarea {
    font-family:
      ui-monospace, SFMono-Regular, 'Menlo', 'Monaco', Consolas, 'Liberation Mono', 'Courier New',
      monospace;
    min-height: 5rem;
    resize: vertical;
  }

  /* 兼容旧的类名 */
  .form-label {
    display: block;
    margin-bottom: 0.375rem;
    font-weight: 500;
    color: #1f2937;
    font-size: 0.875rem;
  }

  .form-select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .form-select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  .form-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      'Noto Sans',
      sans-serif;
    transition: all 0.2s ease;
  }

  .form-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  .form-textarea {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    font-family:
      ui-monospace, SFMono-Regular, 'Menlo', 'Monaco', Consolas, 'Liberation Mono', 'Courier New',
      monospace;
    min-height: 5rem;
    resize: vertical;
    transition: all 0.2s ease;
  }

  .form-textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  .button-group {
    display: flex;
    gap: 0.625rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }

  .btn-primary {
    background-color: #2563eb;
    color: white;
    border-color: #2563eb;
  }

  .btn-primary:hover {
    background-color: #1d4ed8;
  }

  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-secondary {
    background-color: white;
    color: #2563eb;
    border-color: #2563eb;
  }

  .btn-secondary:hover {
    background-color: #eff6ff;
  }

  .btn-success {
    background-color: #059669;
    color: white;
    border-color: #059669;
  }

  .btn-success:hover {
    background-color: #047857;
  }

  .btn-info {
    background-color: #0891b2;
    color: white;
    border-color: #0891b2;
  }

  .btn-info:hover {
    background-color: #0e7490;
  }

  .error-message {
    margin-bottom: 1rem;
    padding: 0.75rem;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #b91c1c;
  }

  .error-message strong {
    font-weight: 600;
  }

  .response-section {
    margin-top: 1.25rem;
  }

  .response-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.625rem;
  }

  .response-content {
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    padding: 0.75rem;
    font-size: 0.875rem;
    font-family:
      ui-monospace, SFMono-Regular, 'Menlo', 'Monaco', Consolas, 'Liberation Mono', 'Courier New',
      monospace;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
  }

  /* 兼容旧的类名 */
  .response-section {
    margin-top: 1.25rem;
  }

  .response-title {
    margin: 0;
    font-size: 1rem;
    color: #1f2937;
  }

  .btn-copy {
    padding: 0.375rem 0.75rem;
    background-color: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.75rem;
    transition: all 0.2s ease;
  }

  .btn-copy:hover {
    background-color: #e5e7eb;
  }

  .code-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.625rem;
    flex-shrink: 0;
  }

  .code-title {
    margin: 0;
    font-size: 1rem;
    color: #1f2937;
  }

  .code-content {
    background-color: #1f2937;
    color: #f9fafb;
    border: 1px solid #374151;
    border-radius: 0.25rem;
    padding: 0.75rem;
    font-size: 0.875rem;
    font-family:
      ui-monospace, SFMono-Regular, 'Menlo', 'Monaco', Consolas, 'Liberation Mono', 'Courier New',
      monospace;
    overflow-x: auto;
    white-space: pre;
    line-height: 1.5;
    flex: 1;
    min-height: 400px;
    max-height: 600px;
    overflow-y: auto;
  }

  .btn-info {
    padding: 0.5rem 1rem;
    background-color: #0891b2;
    color: white;
    border: 1px solid #0891b2;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .btn-info:hover {
    background-color: #0e7490;
  }

  /* 响应式设计 */
  @media (max-width: 1024px) {
    .container {
      flex-direction: column;
      gap: 1.5rem;
    }

    .code-section {
      max-width: 100%;
    }

    .code-content {
      min-height: 300px;
      max-height: 400px;
    }
  }

  @media (max-width: 640px) {
    .container {
      padding: 1rem;
    }

    .button-group {
      flex-direction: column;
    }

    button {
      width: 100%;
    }
  }
`
