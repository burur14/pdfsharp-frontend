import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, pipe } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ImageItem } from '../models/item';

@Injectable()
export class PdfEditService extends ApiService {

    private readonly baseUrl = 'image';

    constructor(http: HttpClient) { super(http) }

    getImages(projectId: number): Observable<ImageItem[]> {
        const url = `${this.baseUrl}?projectId=${projectId}`;

        return this.get<ImageItem[]>(url).pipe(
            map((response) => ImageItem.fromArrayJson(response))
        );
    }

    addImageItem(newImageItem: ImageItem): Observable<ImageItem> {
        const url = `${this.baseUrl}`;
        return this.post<ImageItem, ImageItem>(url, newImageItem).pipe(
            map(response => ImageItem.fromJson(response))
        );
    }

    updateImageItem(newImageItem: ImageItem[]): Observable<ImageItem[]> {
        const url = `${this.baseUrl}`;
        return this.put<ImageItem[], ImageItem[]>(url, newImageItem).pipe(
            map(response => ImageItem.fromArrayJson(response))
        );
    }

    deleteImageItem(imageId: number): Observable<ImageItem> {
        const url = `${this.baseUrl}/${imageId}`;
        return this.delete(url);
    }
    
}
