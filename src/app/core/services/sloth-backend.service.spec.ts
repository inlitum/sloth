import { TestBed } from '@angular/core/testing';

import { SlothBackendService } from './sloth-backend.service';

describe('SlothBackendService', () => {
  let service: SlothBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlothBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
