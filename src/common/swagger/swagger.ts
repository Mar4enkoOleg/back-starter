import { Injectable } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import expressBasicAuth from "express-basic-auth";
import { IApiConfig } from "../interfaces";

@Injectable()
export class Swagger {
  static setupSwagger(app: NestExpressApplication, apiConfig: IApiConfig) {
    const { swaggerUsername, swaggerPassword, swaggerEnabled } = apiConfig;

    //If swagger is enabled but the username/password is not configured, swagger documentation will not be presented
    if (!swaggerUsername || !swaggerPassword || !swaggerEnabled) return;

    const config = new DocumentBuilder()
      .setTitle("Project API")
      .setDescription("Project description")
      .setVersion("0.0.0")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    app.use(
      "/api/*splat",
      expressBasicAuth({
        challenge: true,
        unauthorizedResponse: "Unauthorized",
        users: {
          [swaggerUsername]: swaggerPassword,
        },
      }),
    );

    SwaggerModule.setup("api", app, document);
  }
}
