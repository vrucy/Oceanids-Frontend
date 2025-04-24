import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { CityService } from './services/city.service';
import { MapService } from './services/map.service';
import { SharedDataService } from './services/sharedData.service';


let routes: Routes = []
let providers: (typeof AuthGuard)[] = []


if (true) {
  providers = [AuthGuard]
  routes = [
    { path: '', component: AppComponent, canActivate: [AuthGuard] },
    {
      path: 'map', component: MapComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'city-service',
          component: CityService,
          data: { roles: ['city-service'] },
          runGuardsAndResolvers: 'always'
        },
        {
          path: 'map-service',
          component: MapService,
          data: { roles: ['map-service'] },
          runGuardsAndResolvers: 'always'
        },
        {
          path: 'sharedData-service',
          component: SharedDataService,
          data: { roles: ['sharedData-service'] },
          runGuardsAndResolvers: 'always'
        }
      ]
    }
  ]
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
