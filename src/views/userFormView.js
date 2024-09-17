export class UserFormView {

  form;

  constructor(){
    this.form = document.forms[0].elements;
  }

  getInputValue(userFormModel){
    userFormModel.setInputValue(this.form);

    this.form[0].value = '';
    this.form[1].value = '';
    this.form[2].value = '';
    this.form[3].value = '';
  }

  fillInputValue(userFormModel){
    const userObj =userFormModel.getObjUser()
    this.form[0].value = userObj.name;
    this.form[1].value = userObj.email;
    this.form[2].value = userObj.phone;

    if(userObj.situation == 1){
      this.form[4].checked = true;
    } else {
      this.form[5].checked = true;
    }
  }
}