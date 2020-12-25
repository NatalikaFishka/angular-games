import { TestBed } from '@angular/core/testing';

import { CardCreaterService } from './card-creater.service';

describe('CardCreaterService', () => {
  let service: CardCreaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardCreaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
