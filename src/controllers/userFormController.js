import { UserFormModel } from "../models/userFormModel.js";
import { UserFormView } from "../views/userFormView.js";
import { MessageView } from "../views/messageView.js";
import { MessageModel } from "../models/messageModel.js";

export class UserFormController {

  token;
  userType;
  

  constructor(token, userType){
    this.token = token;
    this.userType = userType;
  }

  handleLogout(){
    let exit;
    if(this.userType === 'admin'){
       exit = '.logout-admin';
    } else if(this.userType === 'suporte') {
      exit = '.logout-support';
    } else if(this.userType === 'cliente'){
      exit = '.logout-client';
    }
    const logout = document.querySelector(exit);
    logout.addEventListener('click', (event)=> {
      event.preventDefault();
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('type');

      window.location.href = "../../index.html";
    })
  }

  async handleFillInInput(id, handleUser){

    const userFormModel = new UserFormModel();
    const userFormView = new UserFormView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try{
      const userFound = await this.fetchFindById(id, handleUser);
      if(userFound.length > 0){
        userFormModel.setUserFound(userFound);
        userFormView.fillInputValue(userFormModel)
        console.log('veio')
      }
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  
  }

  async fetchFindById(id, handleUser){
    console.log(id)
    let response = await fetch(`http://192.168.0.31:3003/user/findById?id=${id}&type=${handleUser}`, {
      method:'get', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      }
    })
    .then(res=>{
      return res.json();
    }).then(json =>{
      if(json.hasOwnProperty('error')){
        console.log(Object.keys(json))
        throw new Error(json.error)
      }
      return json;
    })
    return response;
  }

  handleContainerEditBtn(id, handleUser=''){
    const container = document.querySelector('.button-container-edit');

    if(container){
      if(!container.classList.contains('ativo')){
        container.classList.add('ativo')
      }
    }

    const updateBtn = document.querySelector('.btn-update');
    updateBtn.addEventListener('click', (event) => {
      event.preventDefault();

      this.updateUser(id, handleUser);
    });
   
    const cancelBtn = document.querySelector('.btn-cancel-update');
    cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.back();
    });

  }

  handleContainerEditMySelfBtn(id, handleUser=''){
    const container = document.querySelector('.button-container-edit-mySelf');

    if(container){
      if(!container.classList.contains('ativo')){
        container.classList.add('ativo')
      }
    }

    const updateBtn = document.querySelector('.btn-update-mySelf');
    updateBtn.addEventListener('click', (event) => {
      event.preventDefault();

      this.updateUser(id, handleUser);
    });
   
    const cancelBtn = document.querySelector('.btn-cancel-update-mySelf');
    cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.back();
    });

  }

  handleUserDeleteBtn(id, handleUser){
    const btnDelete = document.querySelector('.btn-delete');

    btnDelete.addEventListener('click', (event) => {
      event.preventDefault();

      this.userDelete(id, handleUser);
    })
  }

  async userDelete(id, handleUser){
 
    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {

      const userDeleted = await this.fetchUserDeleted(id, handleUser);

      if(userDeleted.hasOwnProperty('info')){
        messageModel.setMessage(userDeleted.info);
        messageView.update(messageModel, 'success', 'back');
      }
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async fetchUserDeleted(id, handleUser){
    let response = await fetch('http://192.168.0.31:3003/user/delete', {
      method:'delete', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify({
        "id": id,
        "type":handleUser
      })
    })
    .then(res=>{
      return res.json();
    }).then(json =>{
      if(json.hasOwnProperty('error')){
        console.log(Object.keys(json))
        throw new Error(json.error)
      }
      return json;
    })
    return response;
  }

  async updateUser(id, handleUser){
    const userFormModel = new UserFormModel();
    const userFormView = new UserFormView();
 
    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    userFormView.getInputValue(userFormModel);

    try {
      const dataValidate = userFormModel.dataValidate('update');

      if(dataValidate.status){
        throw new Error(dataValidate.content);
      }
      console.log(id)
      const objUser = userFormModel.getObjUser("update" , handleUser, id);

      const userUpdated = await this.fetchUserUpdate(objUser);

      if(userUpdated.hasOwnProperty('info')){
        messageModel.setMessage(userUpdated.info);
        messageView.update(messageModel, 'success', 'back');
      }
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }

  }

  async fetchUserUpdate(objUser){
    console.log(objUser)
    let response = await fetch('http://192.168.0.31:3003/user/update', {
      method:'put', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify(objUser)
    })
    .then(res=>{
      return res.json();
    }).then(json =>{
      if(json.hasOwnProperty('error')){
        console.log(Object.keys(json))
        throw new Error(json.error)
      }
      return json;
    })
    return response;
  }

  handleContainerCreateBtn(handleUser){
    const container = document.querySelector('.button-container-create');
    console.log(container)
    if(container){
      if(!container.classList.contains('ativo')){
        container.classList.add('ativo')
      }
    }

    const createBtn = document.querySelector('.btn-create');
    createBtn.addEventListener('click', (event) => {
      event.preventDefault();

      this.createUser(handleUser);
    });

    const cancelBtn = document.querySelector('.btn-cancel');
    cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.back();
    });

  }

  async createUser(handleUser){
    const userFormModel = new UserFormModel();
    const userFormView = new UserFormView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    userFormView.getInputValue(userFormModel);

    try {
      const dataValidate = userFormModel.dataValidate('create');

      if(dataValidate.status){
        throw new Error(dataValidate.content);
      }

      const objUser = userFormModel.getObjUser("create", handleUser);

      const userCreated = await this.fetchUserCreate(objUser);
      console.log(objUser)
      if(userCreated.hasOwnProperty('info')){
        messageModel.setMessage(userCreated.info);
        messageView.update(messageModel, 'success', 'back');
      }
    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async fetchUserCreate(objUser){
    let response = await fetch('http://192.168.0.31:3003/user/create', {
      method:'post', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify(objUser)
    })
    .then(res=>{
      return res.json();
    }).then(json =>{
      if(json.hasOwnProperty('error')){
        console.log(Object.keys(json))
        throw new Error(json.error)
      }
      return json;
    })
    return response;
  }

}