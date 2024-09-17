
export class UserModel {

  email;
  password;

  userList;

  setUserList(userList){
    this.userList = userList;
  }

  getUserList(){
    return this.userList;
  }

  setLogin(email, password){
    this.email = email;
    this.password = password;
  }

  getEmail(){
    return this.email;
  }

  getPassword(){
    return this.password;
  }
}