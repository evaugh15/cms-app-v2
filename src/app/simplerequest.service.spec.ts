import { TestBed } from '@angular/core/testing';

import { SimplerequestService } from './simplerequest.service';

describe('SimplerequestService', () => {
  let service: SimplerequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimplerequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
