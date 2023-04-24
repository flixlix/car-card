import { LovelaceCardConfig } from "custom-card-helpers";

export interface CarCardConfig extends LovelaceCardConfig {
  fields: {
    main?: {
      heading?: {
        entity: string;
      };
      subheading1?: {
        entity: string;
      };
      subheading2?: {
        entity: string;
      };
    };
    battery?: {
      state_of_charge?: {
        entity: string;
      };
      target_state_of_charge?: {
        entity: string;
      };
      recommended_target: number;
    };
    charging?: {
      state?: {
        entity: string;
        state_charging: string;
      };
      power?: {
        entity: string;
      };
      speed?: {
        entity: string;
      };
      datetime_finished?: {
        entity: string;
      };
    };
  };
  image: {
    src: string;
    max_height: number;
  };
}
