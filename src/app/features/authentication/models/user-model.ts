import { RoleModel } from "./role-model";

export class UserModel {

    constructor(
        public id = 0,
        public upn = '',
        public displayName = '',
        public role = new RoleModel(),
        public password = '',
        public token = '',
    ) { }

    
  public static fromJson(json: any): UserModel {
    return new UserModel(
      json.id,
      json.upn,
      json.displayName,
      json.role ? RoleModel.fromJson(json.role) : new RoleModel(),
      json.password,
      json.token,
    );
  }

}