import { TestBed } from '@angular/core/testing';

import { MenssagemService } from './menssagem.service';

describe('MenssagemService', () => {
  let service: MenssagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenssagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
