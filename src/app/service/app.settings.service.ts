import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../models/app.settings.model';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AppSettingsService {
  private appSettings: AppSettings;

  constructor(protected httpClient: HttpClient) {}

  loadAppSettings() {
    return new Promise((resolve) => {
      this.httpClient.get<AppSettings>('../../assets/app-settings.json').subscribe(appSettings => {
        this.appSettings = appSettings;
        resolve(appSettings);
      });
    });

   }

  get AppSettings(): AppSettings {
    console.log('appsetings');
    return this.appSettings;
  }  
}
