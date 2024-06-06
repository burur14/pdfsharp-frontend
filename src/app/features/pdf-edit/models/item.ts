interface ItemInterface {
    id: number,
    name: string,
    xPos: number,
    yPos: number,
    rotation: number,
    isHidden: boolean,
    viewId: number
}

export interface TextItem extends ItemInterface {
    fontSize: number,
    isBold: boolean,
    isCursive: boolean,
    isUnderlined: boolean,
}

export interface ImageItem extends ItemInterface {
    opacity: number,
    imageWidth: number,
    imageHeight: number,
    imageRight: number,
    imageBottom: number,
    imageObj: HTMLImageElement,
    imageData: string,
    pdfPage: number
}

export type Item = ImageItem | TextItem;


export class ImageItem {

    constructor(
        public id = 0,
        public name = '',
        public xPos = 0,
        public yPos = 0,
        public rotation = 0,
        public isHidden = false,
        public viewId = 0,
        public opacity = 0,
        public imageWidth = 0,
        public imageHeight = 0,
        public imageRight = 0,
        public imageBottom = 0,
        public imageObj = new Image() as HTMLImageElement,
        public imageData = '',
        public pdfPage = 0

    ) {}

    public static fromJson(json: any): ImageItem {
        return new ImageItem(
            json.id ,
            json.name,
            json.xPos ,
            json.yPos ,
            json.rotation ,
            json.isHidden ,
            json.viewId ,
            json.opacity ,
            json.imageWidth ,
            json.imageHeight ,
            json.imageRight ,
            json.imageBottom ,
            //((new Image()).src = json.imageData) as HTMLImageElement,
            new Image() as HTMLImageElement,
            json.imageData,
            json.pdfPage,
        )
    }

    public static fromArrayJson(json: any[]): ImageItem[] {
        return json.map((user) => ImageItem.fromJson(user));
      }
}