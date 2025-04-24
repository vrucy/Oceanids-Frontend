import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, combineLatest, mergeMap, throwError } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { ExcludedUrlRegex } from 'keycloak-angular/lib/core/interfaces/keycloak-options';

@Injectable()
export class KeycloakBearerInterceptorInterceptor implements HttpInterceptor {

  constructor(private readonly keycloak: KeycloakService) { }

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { enableBearerInterceptor, excludedUrls } = this.keycloak;
    if (!enableBearerInterceptor) {
      return next.handle(req);
    }

    const shallPass: boolean = !this.keycloak.shouldAddToken(req) || excludedUrls.findIndex((item) => this.isUrlExcluded(req, item)) > -1;
    if (shallPass) {
      return next.handle(req);
    }

    return combineLatest([this.conditionallyUpdateToken(req), this.keycloak.isLoggedIn()]).pipe(
      mergeMap(([isLoggedIn]) =>
        isLoggedIn ? this.handleRequestWithTokenHeader(req, next) : next.handle(req)
      )
    );
  }
  private handleRequestWithTokenHeader(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.keycloak.addTokenToHeader(req.headers).pipe(
      mergeMap((headersWithBearer) => {
        const kcReq = req.clone({ headers: headersWithBearer });
        return next.handle(kcReq);
      })
    );
  }
  private async conditionallyUpdateToken(
    req: HttpRequest<unknown>
  ): Promise<boolean> {
    if (this.keycloak.shouldUpdateToken(req)) {
      return await this.keycloak.updateToken();
    }

    return true;
  }

  private isUrlExcluded(
    { method, url }: HttpRequest<unknown>,
    { urlPattern, httpMethods }: ExcludedUrlRegex
  ): boolean {
    const httpTest =
      httpMethods?.length === 0 ||
      httpMethods!.join().indexOf(method.toUpperCase()) > -1;

    const urlTest = urlPattern.test(url);

    return httpTest && urlTest;
  }
}
