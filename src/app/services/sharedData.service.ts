import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private selectedValuesSource = new BehaviorSubject<{
    selectedValue: { selectedCollection: any; selectedAsset: any },
    selectedLatLon: { lat: any; lon: any }
  }>({
    selectedValue: { selectedCollection: null, selectedAsset: null },
    selectedLatLon: { lat: null, lon: null }
  });
  selectedValues$ = this.selectedValuesSource.asObservable();

  private markerPlacedSource = new BehaviorSubject<boolean>(false);
  markerPlaced$ = this.markerPlacedSource.asObservable();

  setMarkerPlaced(isPlaced: boolean) {
    this.markerPlacedSource.next(isPlaced);
  }

  setSelectedCollectionAndAsset(values: { selectedCollection: any, selectedAsset: any }) {
    this.selectedValuesSource.next({
      ...this.selectedValuesSource.value, // the ... allows us to create a new state object that contains all the previous values (Spread the current state)
      selectedValue: values
    });
  }
  setSelectedLatLon(latLon: { lat: any; lon: any }) {
    this.selectedValuesSource.next({
      ...this.selectedValuesSource.value, // Spread the current state
      selectedLatLon: latLon // Overwrite the selectedLatLon property
    });
  }
}
