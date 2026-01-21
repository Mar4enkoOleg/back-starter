import { IsOptional, IsNumberString, IsEnum, IsString } from "class-validator";
import { IApiConfig } from "../common/interfaces";
import { Environments } from "../common/enums";
import { registerConfig } from "../common/utils";

class ApiConfig {
  @IsNumberString()
  PORT: string;

  @IsEnum(Environments)
  ENV: Environments;

  @IsString()
  @IsOptional()
  SWAGGER_ENABLED: string;

  @IsString()
  @IsOptional()
  SWAGGER_USERNAME: string;

  @IsString()
  @IsOptional()
  SWAGGER_PASSWORD: string;
}

export default registerConfig<IApiConfig, ApiConfig>(ApiConfig, (env) => {
  return {
    port: +env.PORT,
    env: env.ENV,
    swaggerEnabled: env.SWAGGER_ENABLED === "true",
    swaggerUsername: env.SWAGGER_USERNAME,
    swaggerPassword: env.SWAGGER_PASSWORD,
  };
});
