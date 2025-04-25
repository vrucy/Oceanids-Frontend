# OceanidsPlatform
[![Azure Static Web Apps CI/CD](https://github.com/OHB-DS/Oceanids-Frontend/actions/workflows/azure-static-web-apps-black-island-0597a3903.yml/badge.svg?branch=main)](https://github.com/OHB-DS/Oceanids-Frontend/actions/workflows/azure-static-web-apps-black-island-0597a3903.yml)

The Oceanids platform is an Angular-based web application designed to provide data visualization and analysis tools for coastal and environmental monitoring. It integrates various components and services to deliver a seamless user experience.

![image](https://github.com/user-attachments/assets/0ca65912-af79-4e26-b065-cc785356dfb5)

### **Setting Up the Development Environment Locally**
- Install dependencies:
  ```
  npm install --force
  ```
- Run the development server:
  ```
  ng serve
  ```
  The app will be available at `http://localhost:4200`.

---

### **Pushing Changes to the Production App**
The Angular application is hosted as an Azure Static Web App at https://black-island-0597a3903.6.azurestaticapps.net/. 

The app is deployed with [Github Actions](https://github.com/OHB-DS/Oceanids-Frontend/actions). Workflow triggers are events that cause a workflow to run.  
In this case, the workflow to build and deploy the app is trigger whenever:
- **changes are pushed or a pull request is merged to the `main` branch.**

Make sure to first push your changes to the `dev`branch and test them in a local environment!

---


## Documentation

Angular apps are modular, made of bricks called *components* and *services*. 

## Components

Components are frontend elements, each component has it's own TypeScript, HTML and CSS file.

#### 1. **Map Component**
- **Path**: `src/app/components/map/map.component.ts`
- **Description**: Displays an interactive map with various layers and tools for data visualization.
- **Features**:
  - City selection and data service toggling.
  - Integration with Leaflet for map rendering and drawing tools.
  - Displays time-series data and images in a side drawer.

#### 2. **Line Chart Component**
- **Path**: `src/app/components/line-chart/line-chart.component.ts`
- **Description**: Renders time-series data as line charts.
- **Features**:
  - Supports dynamic updates based on selected filters.
  - Provides options to download data as CSV or JPG.
  - Displays descriptions for the selected data service.

#### 3. **Description Snackbar Component**
- **Path**: `src/app/shared/components/description-snackbar/description-snackbar.component.ts`
- **Description**: Displays contextual information about data services in a snackbar.

---

### Services

Services are Typescript file that make the API requests to the backend. 

#### 1. **City Service**
- **Path**: `src/app/services/city.service.ts`
- **Description**: Handles API interactions related to cities and their data services.
- **Key Methods**:
  - `getCities()`: Fetches the list of available cities.
  - `getServicesForCity(city: string)`: Retrieves data services for a specific city.
  - `getGeoJson(service: string, city: string, dataType: string)`: Fetches GeoJson layers.
  - `getTimeseriesJson(city: string, service: string, dataId: string)`: Fetches time-series data in JSON format.
  - `getTimeseriesCsv(city: string, service: string, dataId: string)`: Fetches time-series data as a CSV file.
  - `getTimeseriesImages(city: string, service: string, dataId: string)`: Fetches time-series data as base64 image.
  - `getTimeseriesJpg(city: string, service: string, dataId: string)`: Fetches time-series data as JPG file.
  - `postCustomGroundMotionPolygon(geoJson: any, service: string, city: string)`: Posts a new polygon for extracting ground motion points.

#### 2. **Map Service**
- **Path**: `src/app/services/map.service.ts`
- **Description**: Provides utilities for map initialization and interaction.
- **Key Methods**:
  - `initMap(map: L.Map)`: Initializes the map with base layers and controls.
  - `drawToolbar(drawnItems: L.FeatureGroup, isPolyEnabled?: boolean)`: Adds a drawing toolbar to the map.

#### 3. **Loading Service**
- **Path**: `src/app/services/loading.service.ts`
- **Description**: Manages the loading state of the application.
- **Key Methods**:
  - `show()`: Activates the loading indicator.
  - `hide()`: Deactivates the loading indicator.

---

### Functionalities
The main functionalities of the frontend are described below.
1. **Interactive Map**:
   - Select cities and toggle data services.
   - Draw polygons and points for custom data analysis.
   - View time-series data and images in a side drawer.

2. **Data Visualization**:
   - Render time-series data as line charts.
   - Download data in CSV or JPG format.

3. **Service Descriptions**:
   - Display detailed descriptions of available data services.

4. **Dynamic Filtering**:
   - Update data visualizations based on user-selected filters.

---

### Guidelines for Making Changes

#### 1. **Adding a New Component**
- Use Angular CLI to generate a new component:
  ```
  ng generate component <component-name>
  ```
- Add the component to the appropriate module.

#### 2. **Adding a New Service**
- Use Angular CLI to generate a new service:
  ```
  ng generate service <service-name>
  ```
- Register the service in the `providers` array of the module if necessary.

#### 3. **Modifying Existing Components or Services**
- Locate the file in the `src/app` directory.
- Make changes and ensure the functionality is preserved.
- Run unit tests to validate changes:
  ```
  ng test
  ```

#### 4. **Testing**
- Write unit tests for new features or changes.
- Use the `src/app/**/*.spec.ts` files for test cases.

#### 5. **Building for Production**
- Build the app for production:
  ```
  ng build
  ```
  The build artifacts will be stored in the `dist/oceanids5` directory.

---

## Documentation
For further details, refer to the Angular CLI documentation: [Angular CLI Overview and Command Reference](https://angular.io/cli).

