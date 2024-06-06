import { createReducer, on } from "@ngrx/store";
import { initialPdfEditState } from "./pdf-edit.store";
import { addImageItemAction, addImageItemSuccessAction, deleteImageItemAction, deleteTextItemAction, downloadFileAction, downloadFileFailAction, downloadFileSuccessAction, downloadTxtFileAction, downloadTxtFileFailAction, downloadTxtFileSuccessAction, getImagesAction, getImagesFailAction, getImagesSuccessAction, setDocumentPageAction, updateImageItemsAction } from "./pdf-edit.actions";
import { getProjectsAction, getProjectsFailAction, getProjectsSuccessAction } from "../../explorer/store/explorer.actions";

export const pdfEditReducer = createReducer(initialPdfEditState,
    on(deleteImageItemAction, (state, { imageId }) => {
        return {
            ...state,
            imageItems: state.imageItems.filter(i => i.id !== imageId)
        }
    }),
    on(addImageItemAction, (state, { image }) => {
        return {
            ...state,
            //imageItems: [...state.imageItems, image]
        }
    }),
    on(addImageItemSuccessAction, (state, { image }) => {
        return {
            ...state,
        }
    }),
    on(getImagesAction, (state) => {
        return {
            ...state,
            isLoadingImages: true
        }
    }),
    on(getImagesSuccessAction, (state) => {
        return {
            ...state,
            isLoadingImages: false
        }
    }),
    on(getImagesFailAction, (state) => {
        return {
            ...state,
            isLoadingImages: false
        }
    }), 
    on(downloadFileAction, (state) => {
        return {
            ...state,
            isLoadingImages: true
        }
    }),
    on(downloadFileSuccessAction, (state) => {
        return {
            ...state,
            isLoadingImages: false
        }
    }),
    on(downloadFileFailAction, (state) => {
        return {
            ...state,
            isLoadingImages: false
        }
    }), 
    on(downloadTxtFileAction, (state) => {
        return {
            ...state,
            isLoadingImages: true
        }
    }),
    on(downloadTxtFileSuccessAction, (state) => {
        return {
            ...state,
            isLoadingImages: false
        }
    }),
    on(downloadTxtFileFailAction, (state) => {
        return {
            ...state,
            isLoadingImages: false
        }
    }), 
    on(deleteTextItemAction, (state, { itemId }) => {
        return {
            ...state,
            textItems: state.textItems.filter(i => i.id !== itemId)
        }
    }),
    on(setDocumentPageAction, (state, { pageNum }) => {
        return {
            ...state,
            pageNum: pageNum
        }
    }),
     on(updateImageItemsAction, (state, { newImageItems }) => {
        return {
            ...state,
            imageItems: state.imageItems.map(item =>
                newImageItems.find(newItem => newItem.id === item.id) || item
            )
        }
    }),
    on(getImagesSuccessAction, (state, { images }) => {
        return {
            ...state,
            imageItems: [...state.imageItems, ...images.filter(image2 => !state.imageItems.some(image1 => image1.id === image2.id))]
        }
    }),

);