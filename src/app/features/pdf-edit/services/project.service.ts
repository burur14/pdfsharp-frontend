import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService {

  private readonly baseUrl = 'pdf';

  constructor(http: HttpClient) { super(http) }

  downloadDocument(projectId: number): Observable<Blob> {
    const url = `${this.baseUrl}/${projectId}`;
    return this.download(url);
  }

  downloadTxtDocument(projectId: number): Observable<Blob> {
    const url = `${this.baseUrl}/code/${projectId}`;
    return this.download(url);
  }
}
