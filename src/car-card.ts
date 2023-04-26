/* eslint-disable wc/guard-super-call */
/* eslint-disable import/extensions */
/* eslint-disable no-nested-ternary */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { HomeAssistant, LovelaceCardEditor, formatNumber } from "custom-card-helpers";
import { html, LitElement, PropertyValues, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CarCardConfig } from "./car-card-config";
import { registerCustomCard } from "./utils/register-custom-card";
import { styles } from "./style";
import { getDefaultConfig } from "./utils/get-default-config";
import { logError } from "./logging";
import { isNumberValue, coerceNumber } from "./utils/utils";
import { getTimeLeftUntil } from "./utils/get-time-left-until";

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
  private unavailableOrMisconfiguredError = (entityId: string | undefined) =>
    logError(`Entity "${entityId ?? "Unknown"}" is not available or misconfigured`);

  private entityAvailable = (entityId: string): boolean => isNumberValue(this.hass.states[entityId]?.state);

  private getEntityState = (entity?: string, showUnavailable?: boolean): number | string => {
    if (!entity || !this.entityAvailable(entity)) {
      this.unavailableOrMisconfiguredError(entity);
      return showUnavailable ? "Unavailable" : 0;
    }
    return coerceNumber(this.hass.states[entity].state);
  };

  private displayValue = (entity?: string) => {
    const value = this.getEntityState(entity, true);
    if (Number.isNaN(+value)) return value;
    const unit = entity ? this.hass.states[entity]?.attributes?.unit_of_measurement : "%";
    const formatted = formatNumber(value, this.hass.locale);
    return `${formatted}${unit ? ` ${unit}` : ""}`;
  };

  private getTimeLeftCharge = (entity?: string) => {
    const dateTimeFinishedState = entity && this.hass.states[entity].state;
    const timeLeftCharge = entity && getTimeLeftUntil(dateTimeFinishedState);
    return timeLeftCharge;
  };

  protected render(): TemplateResult {
    const { fields } = this._config;

    const topInfo = {
      main: {
        has: !!fields?.main?.heading?.entity,
        state: this.displayValue(fields?.main?.heading?.entity),
      },
      subheading1: {
        has: !!fields?.main?.subheading1?.entity,
        state: this.displayValue(fields?.main?.subheading1?.entity),
      },
      subheading2: {
        has: !!fields?.main?.subheading2?.entity,
        state: this.displayValue(fields?.main?.subheading2?.entity),
      },
    }

    const hasStateOfCharge = !!fields?.battery?.state_of_charge?.entity;
    const stateOfChargeState = this.displayValue(fields?.battery?.state_of_charge?.entity);

    const hasTargetStateOfCharge = !!fields?.battery?.target_state_of_charge?.entity;

    const hasRecommendedTarget = !!fields?.battery?.recommended_target;

    const timeLeftCharge = this.getTimeLeftCharge(fields?.charging?.datetime_finished?.entity);

    const isCharging =
      fields?.charging?.state?.entity &&
      this.hass.states[fields?.charging?.state?.entity].state === (fields?.charging?.state?.state_charging || "on");

    this.style.setProperty("--progress-bar-alert", `${100 - (fields?.battery?.recommended_target || 0) ?? 0}%`);

    this.style.setProperty("--image-max-height", `${this._config?.image?.max_height ?? 200}px`);
    this.style.setProperty("--progress-bar-target", `${this.getEntityState(fields?.battery?.target_state_of_charge?.entity)}%`);
    this.style.setProperty("--progress-bar-active", `${this.getEntityState(fields?.battery?.state_of_charge?.entity)}%`);
    this.style.setProperty("--charging-icon-color", isCharging ? "var(--primary-color)" : "var(--secondary-text-color)");

    return html`
      <ha-card .header=${this._config.title}>
        <div class="flex vertical card-content">
          <div class="grid vertical" id="main-info-container">
            ${!topInfo.main.has ? "" : html` <h1 id="main-info">${topInfo.main.state}</h1>`}
            <div class="flex main-info-subtitle-container">
              ${!topInfo.subheading1.has ? "" : html` <p class="main-info-subtitle">${topInfo.subheading1.state}</p>`}
              ${!topInfo.subheading2.has ? "" : html` <p class="main-info-subtitle">${topInfo.subheading2.state}</p>`}
            </div>
          </div>

          ${!this._config?.image?.src ? "" : html` <img src=${this._config.image.src} width="100%" alt="Your Car" id="main-image" />`}
          ${true
            ? ""
            : html`
                <div class="flex horizontal">
                  <div class="flex vertical" id="charging-text-container">
                    <p class="label1">${isCharging ? "Charging" : "Not Charging"}</p>
                    ${!isCharging ? "" : html`<p class="state1">${timeLeftCharge}</p>`}
                  </div>
                  <ha-icon icon="mdi:flash" id="charge-icon"></ha-icon>
                </div>
              `}
          ${!hasStateOfCharge
            ? ""
            : html` <div class="grid vertical">
                <div class="flex charge-actions-container">
                  <div class="grid vertical">
                    <p id="state-of-charge-label" class="label1">State of Charge</p>
                    <p id="state-of-charge" class="state1">${stateOfChargeState}</p>
                  </div>
                  <div class="grid vertical" id="icon-buttons-container">
                    <ha-icon icon="mdi:speedometer-slow" class="icon-button"></ha-icon>
                    <ha-icon icon="mdi:target" class="icon-button"></ha-icon>
                  </div>
                </div>
                <div id="progress-bar">
                  <div id="progress-bar-inactive"></div>
                  ${hasRecommendedTarget ? html`<div id="progress-bar-alert"></div>` : ""}
                  <div id="progress-bar-active"></div>
                  ${hasTargetStateOfCharge ? html`<div id="progress-bar-target"></div>` : ""}
                </div>
              </div>`}
        </div>
        ${this._config.dashboard_link
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
          : ""}
      </ha-card>
    `;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
  }

  static styles = styles;
}
