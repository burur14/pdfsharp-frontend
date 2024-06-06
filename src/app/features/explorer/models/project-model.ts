export class ProjectModel {
    constructor(
        public id = 0,
        public name = '',
        public userId = 0,
        public base64AttachmentCode = ''
    ) { }

    public static fromJson(json: any): ProjectModel {
        return new ProjectModel(json.id, json.name, json.userId, json.base64AttachmentCode);
    }

    public static fromArrayJson(json: any[]): ProjectModel[] {
        return json.map((role) => ProjectModel.fromJson(role));
    }

    public toJson(): any {
        return {
            id: this.id,
            name: this.name,
            userId: this.userId,
            base64AttachmentCode: this.base64AttachmentCode
        };
    }

}
