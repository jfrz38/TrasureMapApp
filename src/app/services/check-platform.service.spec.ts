import { TestBed } from '@angular/core/testing';

import { CheckPlatformService } from './check-platform.service';

describe('CheckPlatformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckPlatformService = TestBed.get(CheckPlatformService);
    expect(service).toBeTruthy();
  });
});
