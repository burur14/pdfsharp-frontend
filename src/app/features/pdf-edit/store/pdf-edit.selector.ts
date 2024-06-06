import { PDF_EDIT_ACTION_KEY, PdfEditState } from './pdf-edit.store';
import { createFeatureSelector, createSelector } from "@ngrx/store";


export const selectPdfEditState = createFeatureSelector<PdfEditState>(PDF_EDIT_ACTION_KEY);

export const selectTextItems = createSelector(
    selectPdfEditState,
    (state: PdfEditState) => state.textItems
);

export const selectImageItems = createSelector(
    selectPdfEditState,
    (state: PdfEditState) => state.imageItems
);

export const selectPageNum = createSelector(
    selectPdfEditState,
    (state: PdfEditState) => state.pageNum
);

export const selectIsLoadingImages = createSelector(
    selectPdfEditState,
    (state: PdfEditState) => state.isLoadingImages
);