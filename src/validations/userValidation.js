class UserValidation{

  createValidation(data){
    const {name, email, password, phone, situation, type} = data;

    const validName = this.checkName(name);
    const validEmail = this.checkEmail(email);
    const validPassword = this.checkPassword(password);
    const validPhone = this.checkPhone(phone);
    const validSituation = this.checkSituation(situation);
    const validType = this.checkType(type)

    if(validName && validEmail && validPassword && validPhone && validSituation && validType){
      return true;
    }

    return false;
  }

  updateValidation(data){
    const { name, email, phone, situation, password, type } = data;
    const validName = this.checkName(name);
   
    const validEmail = this.checkEmail(email);
   
    const validPhone = this.checkPhone(phone);
 
    let validPassword = true;
    const validSituation = this.checkSituation(situation);
   
    const validType = this.checkType(type);


    if(password){
      validPassword = this.checkPassword(password);
    }

    if(validName && validEmail && validPhone && validPassword && validSituation && validType){
      return true;
    }
    
    return false;
    
  }

  checkId(id){
    if(!id){
      return false;
    }
    return true;
  }

  checkSituation(situation){
    if(situation == 0 || situation == 1){
      return true;
    }
    return false;
  }

  checkName(name){
    if(!name){
      return false;
    } else if(name.length > 50){
      return false;
    }

    return true;
  }

  checkType(type){
    if(!type){
      return false;
    } else if(type == 'admin' || type == 'cliente' || type == 'suporte'){
      return true;
    }
    return false;
  }

  checkEmail(email){
    if(!email){
      return false;
    } else if(email.length > 50) {
      return false;
    }
    return true;
  }

  checkPhone(phone){
    if(!phone){
      return false;
    } else if(phone.length > 20) {
      return false;
    }
    return true;
  }

  checkPassword(password){
    if(!password){
      return false;
    } else if(password.length > 30) {
      return false;
    }
    return true;
  }
}

module.exports = UserValidation;