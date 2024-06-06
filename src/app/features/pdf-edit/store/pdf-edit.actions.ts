import { Action, createAction, props } from '@ngrx/store';
import { PDF_EDIT_ACTION_KEY } from './pdf-edit.store';
import { ImageItem } from '../models/item';
import { MessageModel } from 'src/app/shared/models/message-model';

export const DELETE_TEXT_ITEM = `${PDF_EDIT_ACTION_KEY} Delete text item`;

export const deleteTextItemAction = createAction(
  DELETE_TEXT_ITEM,
  props<{ itemId: number }>()
);

export const ADD_IMAGE_ITEM = `${PDF_EDIT_ACTION_KEY} Add Image item`;
export const ADD_IMAGE_SUCCESS_TYPE = `${PDF_EDIT_ACTION_KEY} Add Image item Success`;
export const ADD_IMAGE_FAIL_TYPE = `${PDF_EDIT_ACTION_KEY} Add Image item Fail`;

export const addImageItemAction = createAction(
  ADD_IMAGE_ITEM,
  props<{ image: ImageItem }>()
);

export const addImageItemSuccessAction = createAction(
  ADD_IMAGE_SUCCESS_TYPE,
  props<{ image: ImageItem }>()
);

export const addImageItemFailAction = createAction(
  ADD_IMAGE_FAIL_TYPE,
  props<{ message: MessageModel }>()
);

export const DELETE_IMAGE_ITEM = `${PDF_EDIT_ACTION_KEY} Delete image item`;
export const DELETE_IMAGE_ITEM_SUCCESS_TYPE = `${PDF_EDIT_ACTION_KEY} Delete image item Success`;
export const DELETE_IMAGE_ITEM_FAIL_TYPE = `${PDF_EDIT_ACTION_KEY} Delete image item Fail`;

export const deleteImageItemAction = createAction(
  DELETE_IMAGE_ITEM,
  props<{ imageId: number }>()
);

export const deleteImageItemSuccessAction = createAction(
  DELETE_IMAGE_ITEM_SUCCESS_TYPE
);

export const deleteImageItemFailAction = createAction(
  DELETE_IMAGE_ITEM_FAIL_TYPE,
  props<{ message: MessageModel }>()
);

export const SET_DOCUMENT_PAGE = `${PDF_EDIT_ACTION_KEY} Set document page`;

export const setDocumentPageAction = createAction(
  SET_DOCUMENT_PAGE,
  props<{ pageNum: number }>()
);

export const UPDATE_IMAGE_ITEMS = `${PDF_EDIT_ACTION_KEY} Update image items`;
export const UPDATE_IMAGE_ITEMS_SUCCESS_TYPE = `${PDF_EDIT_ACTION_KEY} Update image items Success`;
export const UPDATE_IMAGE_ITEMS_FAIL_TYPE = `${PDF_EDIT_ACTION_KEY} Update image items Fail`;

export const updateImageItemsAction = createAction(
  UPDATE_IMAGE_ITEMS,
  props<{ newImageItems: ImageItem[] }>()
);

export const updateImageItemsSuccessAction = createAction(
  UPDATE_IMAGE_ITEMS_SUCCESS_TYPE,
  props<{ images: ImageItem[] }>()
);

export const updateImageItemsFailAction = createAction(
  UPDATE_IMAGE_ITEMS_FAIL_TYPE,
  props<{ message: MessageModel }>()
);

export const GET_IMAGES = `${PDF_EDIT_ACTION_KEY} Get Images`;
export const GET_IMAGES_SUCCESS_TYPE = `${PDF_EDIT_ACTION_KEY} Get Images Success`;
export const GET_IMAGES_FAIL_TYPE = `${PDF_EDIT_ACTION_KEY} Get Images Fail`;

export const getImagesAction = createAction(
  GET_IMAGES,
  props<{ projectId: number }>()
);

export const getImagesSuccessAction = createAction(
  GET_IMAGES_SUCCESS_TYPE,
  props<{ images: ImageItem[] }>()
);

export const getImagesFailAction = createAction(
  GET_IMAGES_FAIL_TYPE,
  props<{ message: MessageModel }>()
);

export const DOWNLOAD_FILE = `${PDF_EDIT_ACTION_KEY} Download File`;
export const DOWNLOAD_FILE_SUCCESS_TYPE = `${PDF_EDIT_ACTION_KEY} Download File Success`;
export const DOWNLOAD_FILE_FAIL_TYPE = `${PDF_EDIT_ACTION_KEY} Download File Fail`;
export const DOWNLOAD_FILE_SAVE_TYPE = `${PDF_EDIT_ACTION_KEY} Download File Save`;

export const downloadFileAction = createAction(
  DOWNLOAD_FILE,
  props<{ projectName: string, projectId: number }>()
);

export const downloadFileSuccessAction = createAction(
  DOWNLOAD_FILE_SUCCESS_TYPE,
  props<{ fileName: string, file: Blob }>()
);

export const downloadFileFailAction = createAction(
  DOWNLOAD_FILE_FAIL_TYPE,
  props<{ message: MessageModel }>()
);

export const downloadFileSaveAction = createAction(
  DOWNLOAD_FILE_SAVE_TYPE
);

export const DOWNLOAD_TXT_FILE = `${PDF_EDIT_ACTION_KEY} Download TXT File`;
export const DOWNLOAD_TXT_FILE_SUCCESS_TYPE = `${PDF_EDIT_ACTION_KEY} Download TXT File Success`;
export const DOWNLOAD_TXT_FILE_FAIL_TYPE = `${PDF_EDIT_ACTION_KEY} Download TXT File Fail`;
export const DOWNLOAD_TXT_FILE_SAVE_TYPE = `${PDF_EDIT_ACTION_KEY} Download TXT File Save`;

export const downloadTxtFileAction = createAction(
  DOWNLOAD_TXT_FILE,
  props<{ projectName: string, projectId: number }>()
);

export const downloadTxtFileSuccessAction = createAction(
  DOWNLOAD_TXT_FILE_SUCCESS_TYPE,
  props<{ fileName: string, file: Blob }>()
);

export const downloadTxtFileFailAction = createAction(
  DOWNLOAD_TXT_FILE_FAIL_TYPE,
  props<{ message: MessageModel }>()
);

export const downloadTxtFileSaveAction = createAction(
  DOWNLOAD_TXT_FILE_SAVE_TYPE
);