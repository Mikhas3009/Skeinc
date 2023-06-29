import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import {ValidationPipe } from '@nestjs/common';

//Точка запуска приложения
async function bootstrap() {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.useStaticAssets(join(__dirname, '..', 'client'));
    app.setBaseViewsDir(join(__dirname, '..', 'client'));
    app.setViewEngine('ejs');
    await app.listen(PORT,() => {console.log(`Serving on port ${PORT}`)});
}
bootstrap();