import { TestBed } from '@angular/core/testing';

import { CheckPlatformService } from './check-platform.service';

describe('CheckPlatformService', () => {
  let service: CheckPlatformService
  beforeEach(() => { 
    service = TestBed.get(CheckPlatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be mobile',()=>{
    expect(service.checkDevice()).toBeFalsy()
  })
});
