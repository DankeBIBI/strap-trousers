import { css } from 'lit'

export const stConsoleStyles = css`
  :host {
    display: block;
  }

  .console-container {
    background-color: #111827;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .console-header {
    background-color: #1f2937;
    padding: 0.75rem;
    border-bottom: 1px solid #374151;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .console-title {
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
  }

  .console-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .console-button {
    padding: 0.25rem 0.5rem;
    border: 1px solid #4b5563;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    background-color: #1f2937;
    color: #d1d5db;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .console-button:hover {
    background-color: #374151;
    border-color: #6b7280;
    color: white;
  }

  .console-button.active {
    background-color: #2563eb;
    border-color: #2563eb;
    color: white;
  }

  .console-select {
    padding: 0.25rem 0.5rem;
    border: 1px solid #4b5563;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    background-color: #1f2937;
    color: #d1d5db;
  }

  .console-content {
    height: 16rem;
    overflow-y: auto;
    padding: 0.75rem;
  }

  .console-content > * + * {
    margin-top: 0.5rem;
  }

  .console-empty {
    color: #6b7280;
    text-align: center;
    padding: 2.5rem 0;
    font-style: italic;
  }

  .console-message {
    font-size: 0.875rem;
    font-family: monospace;
    line-height: 1.25rem;
  }

  .console-timestamp {
    color: #6b7280;
    margin-right: 0.5rem;
    font-size: 0.75rem;
  }

  .console-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
    text-transform: uppercase;
  }

  .console-badge.log {
    background-color: #3b82f6;
    color: white;
  }

  .console-badge.warn {
    background-color: #f59e0b;
    color: white;
  }

  .console-badge.error {
    background-color: #ef4444;
    color: white;
  }

  .console-badge.info {
    background-color: #06b6d4;
    color: white;
  }

  .console-footer {
    background-color: #1f2937;
    padding: 0.75rem;
    border-top: 1px solid #374151;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: #9ca3af;
  }
`