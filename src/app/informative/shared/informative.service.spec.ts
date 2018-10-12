import { TestBed, inject } from '@angular/core/testing';

import { InformativeService } from './informative.service';

describe('InformativeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InformativeService]
    });
  });

  it('should be created', inject([InformativeService], (service: InformativeService) => {
    expect(service).toBeTruthy();
  }));
});
