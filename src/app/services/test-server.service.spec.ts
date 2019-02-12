import { TestBed } from '@angular/core/testing';

import { TestServerService } from './test-server.service';

describe('TestServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestServerService = TestBed.get(TestServerService);
    expect(service).toBeTruthy();
  });
});
