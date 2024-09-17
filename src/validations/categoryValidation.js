
class CategoryValidation {

  createValidation(data){
    const {name, situation} = data;
    const nameValidate = this.checkName(name);
    const situationValidate = this.checkSituation(situation);

    if(nameValidate && situationValidate){
      return true;
    }
    return false;
  }

  updateValidation(data){
    const {id, name, situation} = data;
    const idValidate = this.checkId(id);
    const nameValidate = this.checkName(name);
    const situationValidate = this.checkSituation(situation);

    if(nameValidate && situationValidate && idValidate){
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

  checkName(title){ 
    if(!title){
      return false;
    }
    if(title.length > 50){
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
}

module.exports = CategoryValidation;