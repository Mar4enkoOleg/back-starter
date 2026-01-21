import { ConfigObject, registerAs } from "@nestjs/config";
import { plainToInstance, ClassConstructor } from "class-transformer";
import { validateOrReject } from "class-validator";

type TConfigFactory<TConfig, TValidator> = (
  validatedConfig: TValidator,
) => TConfig | Promise<TConfig>;

/**
 * A way to glue a validator class with the config itself.
 *
 * Forces to define each used environment variable in the validator config.
 **/
export function registerConfig<
  TConfig extends ConfigObject,
  TValidator extends object,
>(
  ConfigClass: ClassConstructor<TValidator>,
  factory: TConfigFactory<TConfig, TValidator>,
) {
  const configToken = ConfigClass.name;

  return registerAs<TConfig>(configToken, async () => {
    const environment = plainToInstance(ConfigClass, process.env);

    try {
      await validateOrReject(environment, { whitelist: true });
    } catch (errors) {
      if (!Array.isArray(errors)) throw errors;

      const errorsText = errors
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        .flatMap((error) => Object.values(error.constraints))
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .map((constraint) => `- ${constraint}`)
        .join(",\n");

      throw new Error(`${configToken} validation failed:\n${errorsText}`);
    }

    return factory(environment);
  });
}
