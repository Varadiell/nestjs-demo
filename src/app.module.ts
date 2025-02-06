import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { LoggerMiddleware } from "./common/middlewares/logger.middleware";

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "cats", method: RequestMethod.GET });
  }

  // --- Route wildcard
  // forRoutes({
  //   path: 'abcd/{*splat}',
  //   method: RequestMethod.ALL,
  // });

  // --- Middleware consumer
  // .forRoutes(CatsController);

  // --- Excluding routes
  // consumer
  // .apply(LoggerMiddleware)
  // .exclude(
  //   { path: 'cats', method: RequestMethod.GET },
  //   { path: 'cats', method: RequestMethod.POST },
  //   'cats/{*splat}',
  // )
  // .forRoutes(CatsController);

  // -- Multiple middlewares
  // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
}
