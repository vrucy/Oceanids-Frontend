import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import chroma from "chroma-js";
import { LegendUtils } from '../shared/utils/Colorbar';
import { ConstantPool } from '@angular/compiler';
import { CapitalAndSpacePipe } from '../shared/pipe/capital-and-space.pipe';

@Injectable({
  providedIn: 'root'
})
export class GeojsonLayerService {

  constructor(private capitalAndSpacePipe: CapitalAndSpacePipe) { }

  addGeoJsonCoastChangeLayer(geoJsonData: any, coastalLine: any, service: string, city: string, drawnItems: L.FeatureGroup, context: any, map: L.Map) {
    const layerGroup = L.layerGroup();
    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature) => {
        return {
          color: this.getColorFromValue(feature?.properties.trend),
          weight: 8, 
          opacity: 1
        };
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          context.handleLayerClick(city, service, layer as L.Path, feature.properties.name);
        });
        layer.on('mouseover', () => {
          (layer as L.Path).setStyle({ weight: 12, color: 'yellow'});
          layer.bindPopup(`Name: ${feature.properties.name}<br>Trend: ${feature.properties.trend} m/year`, {
            autoClose: true
          }).openPopup();
        });
        layer.on('mouseout', () => {
          //@ts-ignore
          (layer as L.Path).setStyle({ weight: 8, color: this.getColorFromValue(feature?.properties.trend), opacity: 1 }); // Reset weight
          layer.closePopup();
        });
      }
    });
    const coastLineLayer = L.geoJSON(coastalLine, {
      style: {
        color: 'black',
        weight: 3,
        opacity: 1
      }
    });
    //@ts-ignore
    layerGroup.options.serviceName = service;
    //@ts-ignore
    layerGroup.options.cityName = city;
    layerGroup.addLayer(geoJsonLayer);
    layerGroup.addLayer(coastLineLayer);
    geoJsonLayer.bringToFront();
    //coastLineLayer.bringToFront();
    layerGroup.addTo(drawnItems);
    this.addColorBar(map, service);
  }
  addGeoJsonGroundMotionLayer(geoJsonData: any, geoJsonPoints: any, service: string, city: string, drawnItems: L.FeatureGroup, context: any, map: L.Map) {
    // add polygon layer
    const layerName = geoJsonData['name'];
    const layerGroup = L.layerGroup();
    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature) => {
        return {
          color: '#ff0000',
          weight: 5,
          opacity: 1,
          fillOpacity: 0
        };
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          context.handleLayerClick(city, service, layer as L.Path, layerName);
        });
        layer.on('mouseover', () => {
          (layer as L.Path).setStyle({
            weight: 8
          });
        });
        layer.on('mouseout', () => {
          (layer as L.Path).setStyle({
            weight: 5
          });
        });
      },
    });
    // add point layer
    const colorScale = chroma.scale(['red', 'white', 'blue']).domain([-10, 0, 10]);
    const pointsLayer = L.geoJSON(geoJsonPoints, {
      pointToLayer: (feature, latlng) => {
        const meanVelocity = feature.properties?.mean_velocity || 0;
        const color = colorScale(meanVelocity).toString();
        return L.circleMarker(latlng, {
          radius: 4,
          fillColor: color,
          color: '#000000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          layer.bindPopup(`Mean velocity: ${feature.properties.mean_velocity} mm/year`, {
            autoClose: true,
          }).openPopup();
        });
        layer.on('mouseover', () => {
          (layer as L.CircleMarker).setStyle({
            radius: 10,
          });
        });
        layer.on('mouseout', () => {
          (layer as L.CircleMarker).setStyle({
            radius: 4,
          });
        });
      },
    });
    //@ts-ignore
    layerGroup.options.serviceName = service;
    //@ts-ignore
    layerGroup.options.cityName = city;
    layerGroup.addLayer(geoJsonLayer);
    layerGroup.addLayer(pointsLayer);
    geoJsonLayer.bringToFront();
    layerGroup.addTo(drawnItems);

    // add the colorbar
    this.addColorBar(map, service);
  }
  addGeoJsonGroundMotionPolygonLayer(geoJsonData: any, service: string, city: string, drawnItems: L.FeatureGroup, context: any, map: L.Map) {
    const layerName = geoJsonData['name'];
    const layerGroup = L.layerGroup();
    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature) => {
        return {
          color: '#ff0000',
          weight: 5,
          opacity: 1,
          fillOpacity: 0
        };
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          context.handleLayerClick(city, service, layer as L.Path, layerName);
        });
        layer.on('mouseover', () => {
          (layer as L.Path).setStyle({
            weight: 8
          });
        });
        layer.on('mouseout', () => {
          (layer as L.Path).setStyle({
            weight: 5
          });
        });
      },
    });

    //@ts-ignore
    layerGroup.options.serviceName = service;
    //@ts-ignore
    layerGroup.options.cityName = city;
    layerGroup.addLayer(geoJsonLayer);
    geoJsonLayer.bringToFront();
    layerGroup.addTo(drawnItems);
  }
  addGeoJsonGroundMotionPointLayer(geoJsonData: any, service: string, city: string, drawnItems: L.FeatureGroup, context: any, map: L.Map) {
    const layerGroup = L.layerGroup();
    const colorScale = chroma.scale(['red', 'white', 'blue']).domain([-10, 0, 10]);
    const geoJsonLayer = L.geoJSON(geoJsonData, {
      pointToLayer: (feature, latlng) => {
        const meanVelocity = feature.properties?.mean_velocity || 0;
        const color = colorScale(meanVelocity).toString();
        return L.circleMarker(latlng, {
          radius: 4,
          fillColor: color,
          color: '#000000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          layer.bindPopup(`Mean velocity: ${feature.properties.mean_velocity} mm/year`, {
            autoClose: true,
          }).openPopup();
        });
        layer.on('mouseover', () => {
          (layer as L.CircleMarker).setStyle({
            radius: 10,
          });
        });
        layer.on('mouseout', () => {
          (layer as L.CircleMarker).setStyle({
            radius: 4,
          });
        });
      },
    });
    //@ts-ignore
    layerGroup.options.serviceName = service;
    //@ts-ignore
    layerGroup.options.cityName = city;
    layerGroup.addLayer(geoJsonLayer);
    geoJsonLayer.bringToFront();
    layerGroup.addTo(drawnItems);
    // add the colorbar to the map
    this.addColorBar(map, service);
  }
  addGeoJsonWavesOrSeaLevelorAtmosphericLayer(geoJsonData: any, service: string, city: string, drawnItems: L.FeatureGroup, context: any, map: L.Map) {
    console.log('geoJsonData:',geoJsonData);
    const layerGroup = L.layerGroup();
    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature) => {
        return {
          color: '#ffffff',
          weight: 3,
          opacity: 1
        };
      },
      pointToLayer: (feature, latlng) => {
        const fillColor = service === 'wave_climate' ? '#0000ff' : service === 'atmospheric_data' ? '#ffa500' : '#ff0000';
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: fillColor,
          color: fillColor,
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          context.handleLayerClick(city, service, layer as L.Path, feature.properties.name);
        });
        layer.on('mouseover', () => {
          (layer as L.CircleMarker).setStyle({ radius: 15 });
          (layer as L.Path).setStyle({ opacity: 0.5 });
          layer.bindPopup(this.capitalAndSpacePipe.transform(service), {
            closeButton: false
          }).openPopup();
        });
        layer.on('mouseout', () => {
          (layer as L.CircleMarker).setStyle({ radius: 8 });
          (layer as L.Path).setStyle({ opacity: 1 });
          layer.closePopup();
        });
      }
    });
    //@ts-ignore
    layerGroup.options.serviceName = service;
    //@ts-ignore
    layerGroup.options.cityName = city;
    layerGroup.addLayer(geoJsonLayer);
    geoJsonLayer.bringToFront();
    layerGroup.addTo(drawnItems);
  }
  private getColorFromValue(value: any): string {
    const scale = chroma.scale(["red", "white", "blue"]).domain([-3, 3]);
    return scale(value as number).hex();
  }
  private addColorBar(map: L.Map, service?: string) {
    // remove any existing colorbar
    const existingLegend = document.querySelector('.info.legend');
    if (existingLegend) {
      existingLegend.remove();  
    }
    // create a new colorbar control
    const ColorBarControl = L.Control.extend({
      options: {position: 'bottomright',},
      onAdd: function () {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = LegendUtils.generateLegend(service || 'defaultService');
        return div;
      },
    });
    const colorBarContainer = new ColorBarControl();
    colorBarContainer.addTo(map); // Add the updated legend to the map
  }
}

