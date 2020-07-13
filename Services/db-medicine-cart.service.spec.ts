import { TestBed, inject } from '@angular/core/testing';

import { DbMedicineCartService } from './db-medicine-cart.service';

describe('DbMedicineCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbMedicineCartService]
    });
  });

  it('should be created', inject([DbMedicineCartService], (service: DbMedicineCartService) => {
    expect(service).toBeTruthy();
  }));
});
