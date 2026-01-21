import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import apiConfig from "./api/api.config";
import { ConsoleLogger, ValidationPipe } from "@nestjs/common";
import { IApiConfig } from "./common/interfaces";
import { Swagger } from "./common/swagger/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({ origin: "*" });

  const config = app.get<IApiConfig>(apiConfig.KEY);

  Swagger.setupSwagger(app, config);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((e) => new ConsoleLogger(JSON.stringify(e)));
