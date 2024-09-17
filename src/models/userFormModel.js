export class UserFormModel {

  name;
  email;
  phone;
  password;
  situation;
 

  setUserFound(userFound){
    this.id = userFound[0].codigo;
    this.name = userFound[0].nome;
    this.email = userFound[0].email;
    this.phone = userFound[0].telefone;
    this.situation = userFound[0].situacao;
  }

  dataValidate(action){
    const errorInfo = new Object({
      status:false,
      content:''
    })

    if(action === 'create'){
      if(!this.name || !this.email|| !this.phone  || !this.password) {
        errorInfo.content = 'É necessário preencher todos os campos. ';
        errorInfo.status = true;
      }
  
      return errorInfo;

    } else {
      if(!this.name || !this.email|| !this.phone) {
        errorInfo.content = 'É necessário preencher todos os campos, com exceção a senha. ';
        errorInfo.status = true;
      }
  
      return errorInfo;
    }
  }

  setInputValue(form){
    this.name = form[0].value;
    this.email = form[1].value;
    this.phone = form[2].value;
    this.password = form[3].value;

    if(form[4].checked){
      this.situation = 1;
    } else {
      this.situation = 0;
    }
  }

  getObjUser(action, handleUser, id=''){

    if(action === 'create'){
      const user = new Object({
        name:this.name,
        email:this.email,
        password:this.password,
        phone:this.phone,
        situation:this.situation,
        type: handleUser
      });
  
      return user;
    } else {
      const user = new Object({
        id: id,
        name:this.name,
        email:this.email,
        password:this.password,
        phone:this.phone,
        situation:this.situation,
        type: handleUser
      });
  
      return user;
    }
  }

}