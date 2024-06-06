import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from "rxjs";
import { MessageModel } from 'src/app/shared/models/message-model';
import { addImageItemAction, addImageItemFailAction, addImageItemSuccessAction, deleteImageItemAction, deleteImageItemFailAction, downloadFileAction, downloadFileFailAction, downloadFileSaveAction, downloadFileSuccessAction, downloadTxtFileAction, downloadTxtFileFailAction, downloadTxtFileSaveAction, downloadTxtFileSuccessAction, getImagesAction, getImagesFailAction, getImagesSuccessAction, updateImageItemsAction } from './pdf-edit.actions';
import { PdfEditService } from '../services/pdf-edit.service';
import { DownloadService } from 'src/app/core/services/download.service';
import { ProjectService } from '../services/project.service';

@Injectable()
export class PdfEditEffects {

    getImages = createEffect(() =>
        this.actions.pipe(
            ofType(getImagesAction),
            mergeMap((props) => {
                return this.pdfEditService.getImages(props.projectId).pipe(
                    map((images) => getImagesSuccessAction({ images })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(getImagesFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    addImageItem = createEffect(() =>
        this.actions.pipe(
            ofType(addImageItemAction),
            mergeMap((props) => {
                return this.pdfEditService.addImageItem(props.image).pipe(
                    map((image) => getImagesAction({ projectId: image.viewId })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(addImageItemFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    updateImageItems = createEffect(() =>
        this.actions.pipe(
            ofType(updateImageItemsAction),
            mergeMap((props) => {
                return this.pdfEditService.updateImageItem(props.newImageItems).pipe(
                    map((images) => getImagesAction({ projectId: images[0].viewId })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(addImageItemFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    deleteImageItem = createEffect(() =>
        this.actions.pipe(
            ofType(deleteImageItemAction),
            mergeMap((props) => {
                return this.pdfEditService.deleteImageItem(props.imageId).pipe(
                    map((image) => getImagesAction({ projectId: image.viewId })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(deleteImageItemFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    downloadFile = createEffect(() =>
        this.actions.pipe(
            ofType(downloadFileAction),
            mergeMap((props) => {
                return this.projectService.downloadDocument(props.projectId).pipe(
                    map((file) => downloadFileSuccessAction({ fileName: props.projectName, file })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(downloadFileFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    downloadFileSuccess = createEffect(() =>
        this.actions.pipe(
            ofType(downloadFileSuccessAction),
            map((props) => {
                this.downloadService.save(props.fileName, props.file)
                return downloadFileSaveAction()
            })
        )
    );

    downloadTxtFile = createEffect(() =>
        this.actions.pipe(
            ofType(downloadTxtFileAction),
            mergeMap((props) => {
                return this.projectService.downloadTxtDocument(props.projectId).pipe(
                    map((file) => downloadTxtFileSuccessAction({ fileName: props.projectName, file })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(downloadTxtFileFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    downloadTxtFileSuccess = createEffect(() =>
        this.actions.pipe(
            ofType(downloadTxtFileSuccessAction),
            map((props) => {
                this.downloadService.save(props.fileName, props.file)
                return downloadTxtFileSaveAction()
            })
        )
    );

    constructor(
        private actions: Actions,
        private pdfEditService: PdfEditService,
        private projectService: ProjectService,
        private downloadService: DownloadService
    ) { }
}