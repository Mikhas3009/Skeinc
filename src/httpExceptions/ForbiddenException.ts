import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    ForbiddenException
} from '@nestjs/common'

@Catch(ForbiddenException)// Перехват некорректных url-запросов
export class ForbiddenExceptionFilter implements ExceptionFilter {
    catch(_exception: ForbiddenException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.redirect('/error');
    }
}