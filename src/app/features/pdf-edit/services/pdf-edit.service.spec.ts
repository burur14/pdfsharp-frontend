/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PdfEditService } from './pdf-edit.service';

describe('Service: PdfEdit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfEditService]
    });
  });

  it('should ...', inject([PdfEditService], (service: PdfEditService) => {
    expect(service).toBeTruthy();
  }));
});
