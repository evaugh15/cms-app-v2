import { TestBed } from '@angular/core/testing';

import { TokenInterceptionService } from './token-interception.service';

describe('TokenInterceptionService', () => {
  let service: TokenInterceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
