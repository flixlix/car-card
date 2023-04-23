import { css } from "lit";

export const styles = css`
  .grid {
    display: grid;
  }
  .flex {
    display: flex;
  }

  .grid.vertical {
    grid-template-rows: 1fr;
  }
  .grid.horizontal {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .flex.vertical {
    flex-direction: column;
  }
  .flex.horizontal {
    flex-direction: row;
  }

  #main-info {
    text-align: center;
    font-weight: 300;
    font-size: 3rem;
  }

  #main-image {
    width: 100%;
    max-height: 200px;
    object-fit: contain;
    margin: 0 auto;
  }

  .charge-actions-container {
    margin-block: 20px;
    justify-content: space-between;
    align-items: center;
  }

  #icon-buttons-container {
    gap: 10px;
  }

  .icon-button {
    cursor: pointer;
    color: var(--secondary-text-color);
  }

  #state-of-charge-label {
    margin-top: 0;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  #state-of-charge {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  #progress-bar {
    position: relative;
    width: 100%;
    height: 2px;
    border-radius: 9999px;
  }

  #progress-bar-inactive {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--primary-color);
    width: 80%;
    height: 100%;
    opacity: 0.3;
    border-radius: 9999px 0 0 9999px;
  }

  #progress-bar-active {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--primary-color);
    width: 50%;
    height: 100%;
    border-radius: inherit;
  }

  #progress-bar-alert {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--error-color);
    opacity: 0.3;
    width: 20%;
    height: 100%;
    border-radius: 0 9999px 9999px 0;
  }

  #progress-bar-marker {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--primary-color);
    width: 2px;
    height: 100%;
  }
`;
