import { ImageItem, TextItem } from '../models/item';

export const PDF_EDIT_ACTION_KEY = '[PDF-EDIT]';

export interface PdfEditState {
  textItems: TextItem[];
  imageItems: ImageItem[];
  pageNum: number,
  isLoadingImages: boolean,
}

export const initialPdfEditState: PdfEditState = {
  textItems: [
    {
      id: 1,
      name: 'Text Item 1',
      xPos: 10,
      yPos: 20,
      rotation: 30,
      isHidden: true,
      viewId: 100,
      fontSize: 16,
      isBold: true,
      isCursive: false,
      isUnderlined: true,
    },
    {
      id: 2,
      name: 'Text Item 2',
      xPos: 30,
      yPos: 40,
      rotation: 60,
      isHidden: true,
      viewId: 101,
      fontSize: 18,
      isBold: false,
      isCursive: true,
      isUnderlined: false,
    },
    {
      id: 3,
      name: 'Text Item 3',
      xPos: 50,
      yPos: 60,
      rotation: 90,
      isHidden: true,
      viewId: 102,
      fontSize: 14,
      isBold: true,
      isCursive: true,
      isUnderlined: false,
    },
  ],
  imageItems: [],
  pageNum: 1,
  isLoadingImages: false
};
