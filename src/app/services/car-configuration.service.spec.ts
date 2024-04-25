import { TestBed } from '@angular/core/testing';

import { CarConfigurationService } from './car-configuration.service';

describe('CarConfigurationService', () => {
  let service: CarConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
