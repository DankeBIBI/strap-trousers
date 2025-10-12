import { css } from 'lit'

export const stPlaygroundStyles = css`
  :host {
    display: block;
  }

  .playground-container {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1.25rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .playground-header {
    margin-bottom: 1.25rem;
  }

  .playground-title {
    margin: 0;
    margin-bottom: 0.625rem;
    font-size: 1.125rem;
    color: #1f2937;
  }

  .playground-description {
    margin: 0;
    font-size: 0.875rem;
    color: #4b5563;
  }

  .tabs-container {
    margin-bottom: 1.25rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .tabs-list {
    display: flex;
    gap: 0.5rem;
  }

  .tab-button {
    padding: 0.5rem 1rem;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-size: 0.875rem;
    color: #6b7280;
    transition: all 0.2s ease;
  }

  .tab-button:hover {
    color: #374151;
  }

  .tab-button.active {
    color: #2563eb;
    border-bottom-color: #2563eb;
  }

  .tab-content {
    padding: 1rem 0;
  }

  .console-container {
    background-color: #111827;
    border-radius: 0.375rem;
    padding: 1rem;
    font-family:
      ui-monospace, SFMono-Regular, 'Menlo', 'Monaco', Consolas, 'Liberation Mono', 'Courier New',
      monospace;
    font-size: 0.75rem;
    color: #f3f4f6;
    min-height: 12rem;
    max-height: 24rem;
    overflow-y: auto;
  }

  .console-line {
    margin-bottom: 0.25rem;
    line-height: 1.25;
  }

  .console-line.log {
    color: #f3f4f6;
  }

  .console-line.info {
    color: #60a5fa;
  }

  .console-line.warn {
    color: #fbbf24;
  }

  .console-line.error {
    color: #f87171;
  }

  .console-line.debug {
    color: #a78bfa;
  }

  .console-timestamp {
    color: #6b7280;
    margin-right: 0.5rem;
  }

  .console-badge {
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.625rem;
    font-weight: 500;
    margin-right: 0.5rem;
  }

  .console-badge.log {
    background-color: #374151;
    color: #f3f4f6;
  }

  .console-badge.info {
    background-color: #1d4ed8;
    color: #dbeafe;
  }

  .console-badge.warn {
    background-color: #d97706;
    color: #fef3c7;
  }

  .console-badge.error {
    background-color: #b91c1c;
    color: #fee2e2;
  }

  .console-badge.debug {
    background-color: #7c3aed;
    color: #ede9fe;
  }

  .console-empty {
    color: #6b7280;
    text-align: center;
    padding: 2rem 0;
  }

  .demo-section {
    margin-bottom: 1.25rem;
  }

  .demo-title {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #1f2937;
  }

  .demo-content {
    padding: 0.75rem;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
  }

  .demo-button {
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: white;
    border: 1px solid #2563eb;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .demo-button:hover {
    background-color: #1d4ed8;
  }

  .demo-button.secondary {
    background-color: white;
    color: #2563eb;
  }

  .demo-button.secondary:hover {
    background-color: #eff6ff;
  }

  .demo-button.success {
    background-color: #059669;
    border-color: #059669;
  }

  .demo-button.success:hover {
    background-color: #047857;
  }

  .demo-button.warning {
    background-color: #d97706;
    border-color: #d97706;
  }

  .demo-button.warning:hover {
    background-color: #b45309;
  }

  .demo-button.danger {
    background-color: #b91c1c;
    border-color: #b91c1c;
  }

  .demo-button.danger:hover {
    background-color: #991b1b;
  }

  .demo-output {
    margin-top: 0.75rem;
    padding: 0.75rem;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #374151;
  }

  .demo-counter {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background-color: #2563eb;
    color: white;
    border-radius: 9999px;
    font-weight: 600;
    margin-left: 0.5rem;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .demo-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 768px) {
    .demo-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .demo-card {
    padding: 1rem;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .demo-card-title {
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #1f2937;
  }

  .demo-card-content {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .playground-wrapper {
    max-width: 72rem;
    margin: 0 auto;
    padding: 1.25rem;
  }

  .playground-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .playground-title {
    margin: 0;
    font-size: 1.875rem;
    color: #1f2937;
  }

  .playground-actions {
    display: flex;
    gap: 0.625rem;
  }

  .tabs-wrapper {
    display: flex;
    border-bottom: 2px solid #e5e7eb;
    margin-bottom: 1.25rem;
  }

  .tab-button {
    background: none;
    border: none;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-size: 1rem;
    color: #4b5563;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .tab-button:hover {
    color: #1f2937;
  }

  .tab-button.active {
    color: #2563eb;
    border-bottom-color: #2563eb;
  }

  .content-area {
    background-color: white;
    border-radius: 0.375rem;
    padding: 1.25rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .btn-primary {
    padding: 0.375rem 0.75rem;
    background-color: #2563eb;
    color: white;
    border: 1px solid #2563eb;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    background-color: #1d4ed8;
  }

  .btn-secondary {
    padding: 0.375rem 0.75rem;
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .btn-secondary:hover {
    background-color: #e5e7eb;
  }

  .results-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .result-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }

  .console-empty {
    color: #6b7280;
    font-style: italic;
    font-size: 0.875rem;
    text-align: center;
    padding: 2rem 0;
  }

  .loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
  }

  .loading-text {
    font-size: 0.875rem;
    color: #6b7280;
    margin-left: 0.5rem;
  }

  .empty-state {
    text-align: center;
    padding: 2rem 0;
    color: #6b7280;
  }

  .empty-text {
    font-size: 0.875rem;
  }

  .demo-section {
    margin-bottom: 2rem;
  }

  .demo-title {
    font-size: 1.25rem;
    color: #1f2937;
    margin-bottom: 0.75rem;
  }

  .demo-output {
    margin-top: 0.75rem;
    padding: 0.75rem;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #374151;
  }

  .demo-button {
    padding: 0.5rem 1rem;
    background-color: #2563eb;
    color: white;
    border: 1px solid #2563eb;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    transition: all 0.2s ease;
  }

  .demo-button:hover {
    background-color: #1d4ed8;
  }

  .demo-button.secondary {
    background-color: #6b7280;
    border-color: #6b7280;
  }

  .demo-button.secondary:hover {
    background-color: #4b5563;
  }

  .demo-button.success {
    background-color: #059669;
    border-color: #059669;
  }

  .demo-button.success:hover {
    background-color: #047857;
  }

  .demo-button.warning {
    background-color: #d97706;
    border-color: #d97706;
  }

  .demo-button.warning:hover {
    background-color: #b45309;
  }

  .demo-content {
    padding: 1rem;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.25rem;
  }

  .demo-card-title {
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .demo-card-content {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.75rem;
  }

  .demo-card-content ul {
    margin: 0.5rem 0;
    padding-left: 1.25rem;
  }

  .demo-card-content li {
    margin-bottom: 0.25rem;
  }

  .console-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 0.5rem;
  }

  .console-badge.error {
    background-color: #ef4444;
    color: white;
  }

  .console-badge.warn {
    background-color: #f59e0b;
    color: white;
  }

  .console-badge.log {
    background-color: #10b981;
    color: white;
  }

  .console-timestamp {
    color: #6b7280;
    font-size: 0.75rem;
    margin-right: 0.5rem;
  }

  .console-line {
    flex: 1;
    color: #374151;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* 控制台开关按钮 */
  .console-toggle-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #3b82f6;
    color: white;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    z-index: 1000;
  }

  .console-toggle-btn:hover {
    background-color: #2563eb;
    transform: scale(1.1);
  }

  /* 控制台容器 - 基础样式 */
  .console-container {
    position: fixed;
    background-color: white;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
  }

  /* 弹出模式样式 */
  .console-container.popup {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 600px;
    height: 500px;
    opacity: 0;
    visibility: hidden;
  }

  .console-container.popup.open {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    visibility: visible;
  }

  /* 侧边栏模式样式 */
  .console-container.sidebar {
    right: -40vw;
    top: 0;
    width: 40vw;
    height: 100vh;
    border-radius: 0;
  }

  .console-container.sidebar.open {
    right: 0;
  }

  /* 控制台头部 */
  .console-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0;
  }

  .console-header h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #1e293b;
  }

  .console-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .console-mode-btn {
    background: none;
    border: 1px solid #d1d5db;
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #6b7280;
  }

  .console-mode-btn:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
  }

  .console-mode-btn.active {
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }

  .console-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #64748b;
    padding: 0.25rem;
    border-radius: 0.25rem;
    transition: color 0.2s ease;
    margin-left: 0.5rem;
  }

  .console-close:hover {
    color: #475569;
    background-color: #f1f5f9;
  }

  .console-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* 全功能控制台样式 */
  .full-console {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .console-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    font-size: 0.875rem;
    color: #64748b;
  }

  .console-clear-btn {
    background-color: #ef4444;
    color: white;
    border: none;
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .console-clear-btn:hover {
    background-color: #dc2626;
  }

  .console-log-list {
    flex: 1;
    overflow-y: auto;
    padding: 0.75rem;
  }

  /* 遮罩层样式 */
  .console-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .console-log-item {
    margin-bottom: 0.75rem;
    padding: 0.75rem;
    border-radius: 0.375rem;
    border-left: 4px solid;
    background-color: #f8fafc;
  }

  .console-log-item.log {
    border-left-color: #10b981;
    background-color: #f0fdf4;
  }

  .console-log-item.error {
    border-left-color: #ef4444;
    background-color: #fef2f2;
  }

  .console-log-item.warn {
    border-left-color: #f59e0b;
    background-color: #fffbeb;
  }

  .console-log-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .console-log-time {
    font-size: 0.75rem;
    color: #64748b;
    font-family: monospace;
  }

  .console-log-message {
    font-size: 0.875rem;
    color: #374151;
    line-height: 1.5;
    word-break: break-word;
    font-family: monospace;
    white-space: pre-wrap;
  }

  .console-empty {
    text-align: center;
    color: #9ca3af;
    font-style: italic;
    padding: 2rem 0;
    font-size: 0.875rem;
  }

  /* 控制台徽章样式 */
  .console-badge {
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    min-width: 20px;
    text-align: center;
  }

  .console-badge.error {
    background-color: #ef4444;
    color: white;
  }

  .console-badge.warn {
    background-color: #f59e0b;
    color: white;
  }

  .console-badge.log {
    background-color: #10b981;
    color: white;
  }
`
