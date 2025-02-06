import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common/filter/http-exception.filter";
import { RolesGuard } from "./common/guards/roles.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new RolesGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
