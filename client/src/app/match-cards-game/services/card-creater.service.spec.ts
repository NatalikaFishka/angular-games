import { TestBed } from '@angular/core/testing';

import { CardCreatorService } from './card-creater.service';

describe('CardCreatorService', () => {
  let service: CardCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
