import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ApiModule } from "./api/api.module";
import { UserModule } from "./modules/user/user.module";
import { Swagger } from "./common/swagger/swagger";
import { ConfigModule } from "@nestjs/config";
import apiConfig from "./api/api.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
    }),
    ApiModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, Swagger],
})
export class AppModule {}
