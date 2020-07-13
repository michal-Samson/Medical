import { TestBed, inject } from '@angular/core/testing';

import { DbUserDetailsService } from './db-user-details.service';

describe('DbUserDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbUserDetailsService]
    });
  });

  it('should be created', inject([DbUserDetailsService], (service: DbUserDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
