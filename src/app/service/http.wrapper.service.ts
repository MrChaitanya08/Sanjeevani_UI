import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppSettings } from '../models/app.settings.model';
import { AppSettingsService } from './app.settings.service';

@Injectable()
export class HttpWrapperService {
  baseUrlWithVersion: string;

  constructor(protected httpClient: HttpClient,private appSettingService:AppSettingsService) { }

  public getFullUrl(url: string) {
    const baseUrl = this.appSettingService.AppSettings;
    const postUrl = `${baseUrl.URLBase}${url}`;
    return postUrl;
  }
  get<T>(url: string): Observable<T> {
    const u = this.getFullUrl(url);
    return this.httpClient.get<T>(u).pipe(catchError(this.errorHandler.bind(this)));
  }
  getWithPrams<T>(
    url: string,
    options?: {
      headers?:
      | HttpHeaders
      | {
        [header: string]: string | string[];
      };
      observe?: 'body';
      params?:
      | HttpParams
      | {
        [param: string]: string | string[];
      };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    const postUrl = this.getFullUrl(url);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
      })
    };

    return this.httpClient.get<T>(postUrl, options).pipe(catchError(this.errorHandler.bind(this)));
  }

  post<T>(url: string, data: Object): Observable<T> {
    const postUrl = this.getFullUrl(url);
    return this.httpClient.post<T>(postUrl, data).pipe(catchError(this.errorHandler.bind(this)));
  }

//   postBlobData<T>(
//     url: string,
//     data: Object,
//     usebaseUrlWithVersion = false,
//     options: {
//       headers?:
//       | HttpHeaders
//       | {
//         [header: string]: string | string[];
//       };
//       observe?: 'body';
//       params?:
//       | HttpParams
//       | {
//         [param: string]: string | string[];
//       };
//       reportProgress?: boolean;
//       responseType: 'blob';
//       withCredentials?: boolean;
//     }
//   ): Observable<Blob> {
//     const postUrl = this.getFullUrl(url, usebaseUrlWithVersion);
//     return this.httpClient.post(postUrl, data, options).pipe(catchError(this.errorHandler.bind(this)));
//   }

//   getBlobData<T>(
//     url: string,
//     data: Object,
//     usebaseUrlWithVersion = false,
//     options: {
//       headers?:
//       | HttpHeaders
//       | {
//         [header: string]: string | string[];
//       };
//       observe?: 'body';
//       params?:
//       | HttpParams
//       | {
//         [param: string]: string | string[];
//       };
//       reportProgress?: boolean;
//       responseType: 'blob';
//       withCredentials?: boolean;
//     }
//   ): Observable<Blob> {
//     const postUrl = this.getFullUrl(url, usebaseUrlWithVersion);
//     return this.httpClient.get(postUrl, options).pipe(catchError(this.errorHandler.bind(this)));
//   }

  put<T>(url: string, data: Object, usebaseUrlWithVersion = false): Observable<T> {
    const postUrl = this.getFullUrl(url);
    return this.httpClient.put<T>(postUrl, data).pipe(catchError(this.errorHandler.bind(this)));
  }

  delete<T>(endpoint: string, data: Object, usebaseUrlWithVersion = false): Observable<T> {
    const url = this.getFullUrl(endpoint);
    return this.httpClient.delete<T>(url, data).pipe(catchError(this.errorHandler.bind(this)));
  }

  errorHandler(error: any): Observable<any> {
    const e = error as HttpErrorResponse;
    console.log(error);
    return throwError(error);
  }
}
