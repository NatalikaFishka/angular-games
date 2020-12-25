import { TestBed } from '@angular/core/testing';

import { CardConfigGeneratorService } from './card-config-generator.service';

describe('CardConfigGeneratorService', () => {
  let service: CardConfigGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardConfigGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
