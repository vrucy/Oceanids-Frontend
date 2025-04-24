import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(private loader: LoadingService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loader.show();
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          if (request.url.split('/').at(-1) === 'video_url') {
            setTimeout(() => {
              this.loader.hide();
            }, 1500);
          } else {
            this.loader.hide();
          }
        }
      }),
    );
  }
}