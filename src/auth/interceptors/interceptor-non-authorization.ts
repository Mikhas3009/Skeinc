import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import {cookieParser} from 'src/hepls-services/cookieParser';

@Injectable()
export class NonAuthInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const cookies = request.headers.cookie;
    if(!request.headers.cookie){
      return response.redirect('/signin');
    }
    if(cookies){
      const parsedCookies = cookieParser(cookies)
      if(Object.prototype.hasOwnProperty.call(parsedCookies, 'AccsesToken')){
          return next.handle();
      }
      else{
          return response.redirect('/signin');
      }
    }
    else{
      return response.redirect('/signin');
    }
  }
}