import { TestBed } from '@angular/core/testing';

import { DbSceduleService } from './db-scedule.service';

describe('DbSceduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbSceduleService = TestBed.get(DbSceduleService);
    expect(service).toBeTruthy();
  });
});
