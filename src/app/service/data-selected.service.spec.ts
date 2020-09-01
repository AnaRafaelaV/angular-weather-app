import { TestBed } from '@angular/core/testing';

import { DataSelectedService } from './data-selected.service';

describe('DataSelectedService', () => {
  let service: DataSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
