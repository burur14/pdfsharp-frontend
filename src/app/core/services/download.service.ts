import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DownloadService {
    
    save(file_name: string, blob: Blob) {
        const path = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = path;
        a.download = file_name;
        a.click();
        window.URL.revokeObjectURL(path);
        a.remove();
    }

}