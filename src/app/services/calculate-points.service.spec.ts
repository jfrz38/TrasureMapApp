import { TestBed } from '@angular/core/testing';

import { CalculatePointsService } from './calculate-points.service';

describe('CalculatePointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculatePointsService = TestBed.get(CalculatePointsService);
    expect(service).toBeTruthy();
  });
});
