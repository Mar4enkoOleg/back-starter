import { Environments } from "../enums";

export interface IApiConfig {
  env: Environments;
  port: number;
  swaggerEnabled: boolean;
  swaggerPassword: string;
  swaggerUsername: string;
}
