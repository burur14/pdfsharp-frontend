import { RoleEnum } from "../enums/role-enum";

export class RoleModel {
  constructor(
    public id = 0,
    public name = RoleEnum.USER,
    public description = ''
  ) { }


  public static fromJson(json: any): RoleModel {
    return new RoleModel(json.id, json.name, json.description);
  }

  public static fromArrayJson(json: any[]): RoleModel[] {
    return json.map((role) => RoleModel.fromJson(role));
  }

  public toJson(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description
    };
  }
}