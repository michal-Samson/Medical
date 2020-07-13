import { TestBed } from '@angular/core/testing';

import { ExternalInterfacesService } from './external-interfaces.service';

describe('ExternalInterfacesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExternalInterfacesService = TestBed.get(ExternalInterfacesService);
    expect(service).toBeTruthy();
  });
});
