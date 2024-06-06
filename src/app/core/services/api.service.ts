import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get<R>(path: string): Observable<R> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${path}`;

    return this.http.get<R>(url, headers);
  }


  post<R, B>(path: string, body: B): Observable<R> {
    const headers = this.getHeaders();
    const completeUrl = `${this.apiUrl}/${path}`;

    return this.http.post<R>(completeUrl, body, headers);
  }

  put<R, B>(path: string, body: B): Observable<R> {
    const headers = this.getHeaders();
    const completeUrl = `${this.apiUrl}/${path}`;

    return this.http.put<R>(completeUrl, body, headers);
  }

  delete<R>(path: string): Observable<R> {
    const headers = this.getHeaders();
    const completeUrl = `${this.apiUrl}/${path}`;

    return this.http.delete<R>(completeUrl, headers);
  }

  massiveDelete<R, B>(path: string, body: B): Observable<R> {
    const completeUrl = `${this.apiUrl}/${path}`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: body
    };

    return this.http.delete<R>(completeUrl, options);
  }

  download(path: string): Observable<Blob> {
    const completeUrl = `${this.apiUrl}/${path}`;

    return this.http.get(completeUrl, {
      responseType: 'blob'
    });
  }

  uploadDownload<B>(path: string, body: B): Observable<Blob> {
    const completeUrl = `${this.apiUrl}/${path}`;

    return this.http.post(completeUrl, body, {responseType: 'blob'});
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        responseType: 'json'
      })
    };
  }

}
