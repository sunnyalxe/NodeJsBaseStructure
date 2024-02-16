import bcrypt from "bcrypt";
import BaseModel from "./../../helpers/baseModel.js";
class UserModel extends BaseModel {
  constructor() {
    super({
      name: "User",
      tableName: "users",
      exposedFields: ["id", "username", "email", "updated_at", "created_at"]
    });
    this.SALT_ROUNDS = 10;
  }

  hashPassword = async (password) => {
    try {
      return await bcrypt.hash(password, this.SALT_ROUNDS);
    } catch (err) {
      throw new Error(`Error hashing password: ${err}`);
    }
  };

  verifyPassword = async (password, hash) => {
    try {
      return await bcrypt.compare(password, hash);
    } catch (err) {
      throw new Error(`Error comparing passwords: ${err}`);
    }
  };
  
  verify = async (username, password) => {
    const matchErrorMsg = "Username or password do not match";
    
    try {
      const selectFields = [...this.exposedFields,"password"]
      const user = await this.find({ username },selectFields);
      if (!user) throw new Error(matchErrorMsg+".");
      const isMatch = await this.verifyPassword(password, user[0].password);
      
      if (!isMatch) throw new Error(matchErrorMsg);
      delete user[0].password;
      return user[0];
    } catch (err) {
      throw new Error(matchErrorMsg);
    }
  };

  beforeSave = async (user) => {
    if (!user.password) return user;
    console.log(user)
    const hashedPassword = await this.hashPassword(user.password);
    return { ...user, password: hashedPassword };
  };

  create = async (props) => {
    const user = await this.beforeSave(props);
    return super.create(user);
  };

  
}

export default UserModel;
