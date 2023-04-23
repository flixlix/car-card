/* eslint-disable wc/guard-super-call */
/* eslint-disable import/extensions */
/* eslint-disable no-nested-ternary */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CarCardConfig } from "./car-card-config";
import { registerCustomCard } from "./utils/register-custom-card";
import { styles } from "./style";
import { getDefaultConfig } from "./utils/get-default-config";

registerCustomCard({
  type: "car-card",
  name: "Car Card",
  description: "A Card to display the current state of your car.",
});

@customElement("car-card")
export class CarCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config = {} as CarCardConfig;

  setConfig(config: CarCardConfig): void {
    this._config = config;
  }

  public connectedCallback() {
    super.connectedCallback();
  }

  public disconnectedCallback() {}

  // do not use ui editor for now, as it is not working
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import("./ui-editor/ui-editor");
    return document.createElement("car-card-editor");
  }

  public static getStubConfig(): object {
    return getDefaultConfig();
  }

  public getCardSize(): Promise<number> | number {
    return 3;
  }

  protected render(): TemplateResult {
    return html`
      <ha-card .header=${this._config.title}>
        <div class="card-content">
          <div class="grid vertical" id="main-info-container">
            ${!this._config?.main_info?.entity ? "" : html` <h1 id="main-info">${this._config.main_info.entity}</h1>`}
            ${!this._config?.image?.src ? "" : html` <img src=${this._config.image.src} width="100%" alt="Your Car" id="main-image" />`}
            ${
              !this._config?.state_of_charge?.entity
                ? ""
                : html` <div class="grid vertical">
                    <div class="flex charge-actions-container">
                      <div class="grid vertical">
                        <p id="state-of-charge-label">State of Charge</p>
                        <p id="state-of-charge">${this._config.state_of_charge.entity}</p>
                      </div>
                      <div class="grid vertical" id="icon-buttons-container">
                        <ha-icon icon="mdi:speedometer-slow" class="icon-button"></ha-icon>
                        <ha-icon icon="mdi:target" class="icon-button"></ha-icon>
                      </div>
                    </div>
                    <div id="progress-bar">
                      <div id="progress-bar-inactive"></div>
                      <div id="progress-bar-active"></div>
                      <div id="progress-bar-alert"></div>
                      <div id="progress-bar-marker"></div>
                    </div>
                  </div>`
            }
        </div>
        ${
          this._config.dashboard_link
            ? html`
                <div class="card-actions">
                  <a href=${this._config.dashboard_link}
                    ><mwc-button>
                      ${this._config.dashboard_link_label ||
                      this.hass.localize("ui.panel.lovelace.cards.energy.energy_distribution.go_to_energy_dashboard")}
                    </mwc-button></a
                  >
                </div>
              `
            : ""
        }
      </ha-card>
    `;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
  }

  static styles = styles;
}
