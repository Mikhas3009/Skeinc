import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException,
  } from '@nestjs/common'

@Catch(NotFoundException)// Перехват некорректных url-запросов
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(_exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.redirect('/error');
    }
}