import { TestBed } from '@angular/core/testing';

import { KeycloakBearerInterceptorInterceptor } from './keycloak-bearer-interceptor.interceptor';

describe('KeycloakBearerInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      KeycloakBearerInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: KeycloakBearerInterceptorInterceptor = TestBed.inject(KeycloakBearerInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
