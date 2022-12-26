import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule, MatFormFieldModule, MatInputModule, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppSettingsService } from './service/app.settings.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpWrapperService } from './service/http.wrapper.service';
import { FacilityService } from './service/facility.service';
import { ReviewComponent } from './modules/review/review.component';
import { PatientReviewService } from './service/patient.review.service';
import { SharedModule } from './modules/shared.module';
import { FooterComponent } from './shared/component/footer/footer.component';
import { LoaderService } from './service/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'never' } },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AppSettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppSettingLoader,
      deps: [AppSettingsService],
      multi: true
    },
    HttpWrapperService,
    FacilityService,
    PatientReviewService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function AppSettingLoader(appSettingsService: AppSettingsService) {
  return () => appSettingsService.loadAppSettings();
}
