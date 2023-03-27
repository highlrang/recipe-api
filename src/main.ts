import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalFilters(new HttpExceptionFilter()); // 여기서 filter 등록하면 DI 사용 못 함 -> DI 사용하려면 AppModule에서 provider로 등록

  // app.useGlobalGuards()
  // app.useGlobalInterceptors()
  // app.useGlobalPipes()
  
  await app.listen(3000);
}
bootstrap();
