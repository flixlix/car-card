import { css } from "lit";

export const styles = css`
  :host {
    --image-max-height: 200px;
    --progress-bar-active: 0%;
    --progress-bar-target: 100%;
    --progress-bar-alert: 0%;
    --charging-icon-color: var(--secondary-text-color);
  }

  .card-content {
    gap: 20px;
  }

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
    justify-content: space-between;
  }

  #main-info {
    text-align: center;
    font-weight: 300;
    font-size: 3rem;
    display: inline-block;
    width: fit-content;
    margin: 0;
  }

  #main-info-container {
    margin: 0 auto;
    width: fit-content;
  }

  .main-info-subtitle-container {
    justify-content: space-between;
    margin: 0;
    margin-top: 10px;
  }

  .main-info-subtitle {
    margin: 0;
    margin-top: 10px;
  }

  #main-image {
    width: 100%;
    max-height: var(--image-max-height);
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
  }

  .label1 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 0.9rem;
  }

  #state-of-charge {
  }

  .state1 {
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
    width: calc(100% - var(--progress-bar-alert));
    height: 100%;
    opacity: 0.3;
    border-radius: 9999px 0 0 9999px;
  }

  #progress-bar-active {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--primary-color);
    width: var(--progress-bar-active);
    transition: width 0.5s ease-in-out;
    height: 100%;
    border-radius: inherit;
  }

  #progress-bar-alert {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--error-color);
    opacity: 0.3;
    width: var(--progress-bar-alert);
    height: 100%;
    border-radius: 0 9999px 9999px 0;
  }

  #progress-bar-target {
    transition: left 0.5s ease-in-out;
    position: absolute;
    top: 50%;
    left: var(--progress-bar-target);
    transform: translate(-50%, -50%);
    background-color: var(--secondary-text-color);
    width: 2px;
    height: 600%;
  }

  #charge-icon {
    color: var(--charging-icon-color);
    --mdc-icon-size: 48px;
  }

  h4,
  h6 {
    margin: 0;
  }

  #charging-text-container {
    justify-content: center;
  }
`;
