import { TestBed } from '@angular/core/testing';

import { GeojsonLayerService } from './geojson-layer.service';

describe('GeojsonLayerService', () => {
  let service: GeojsonLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeojsonLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
