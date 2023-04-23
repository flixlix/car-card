import { LovelaceCardConfig } from "custom-card-helpers";

export interface CarCardConfig extends LovelaceCardConfig {
  main_info: {
    entity: string;
  };
  state_of_charge: {
    entity: string;
  };
  target_state_of_charge: {
    entity: string;
  };
  image: {
    src: string;
    height: number;
  };
}
