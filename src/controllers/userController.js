import { UserModel } from "../models/userModel.js";
import { UserView } from "../views/userView.js";
import { MessageView } from "../views/messageView.js";
import { MessageModel } from "../models/messageModel.js";

export class UserController {

  token;
  userType;

  constructor(token = '', userType = ''){
    if(token){
      this.token = token;
    }

    if(userType){
      this.userType = userType;
    }
  }

  handleLogout(){
    let exit;
    if(this.userType === 'admin'){
       exit = '.logout-admin';
    } else if(this.userType === 'suporte') {
      exit = '.logout-support'
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

  handleAddClientBtn(){

    if(this.userType === 'admin'){
      const btn = document.querySelector('.add-btn');
      btn.setAttribute('href', './userFormHandledByAdmin.html?action=rg&user=cliente');
    } else if(this.userType === 'suporte'){
      const btn = document.querySelector('.add-btn');
      btn.setAttribute('href', './userFormHandledBySupport.html?action=rg&user=cliente');
    }
  }

  

  async supportList(userList){
    const userModel = new UserModel();
    const userView = new UserView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();
 
    try {
      const list = await this.fetchUserList(userList);
      userModel.setUserList(list);
      userView.displaySupportList(userModel);

    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async adminList(userList){
    const userModel = new UserModel();
    const userView = new UserView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {
      const list = await this.fetchUserList(userList);
      userModel.setUserList(list);
      userView.displayAdminList(userModel);

    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async clientList(userList){
    const userModel = new UserModel();
    const userView = new UserView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();
  
    try {
      const list = await this.fetchUserList(userList);
      userModel.setUserList(list);
      userView.displayCLientList(userModel, this.userType);

    } catch(error){
      console.log(error)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async fetchUserList(userList){
    console.log(this.token)
    const url = `http://192.168.0.31:3003/user/findAll?type=${userList}`;
    console.log('fetch')
    let response = await fetch(url, {
      method:'get', 
      cache:"no-store",
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
  
  async handleLogin(){
    
    const userModel = new UserModel();
    const userView = new UserView();

    const login = document.querySelector('#signIn');
    login.addEventListener('click', async(event) => {
      event.preventDefault();
      const messageContainer = document.querySelector('.message-container');
      const messageView = new MessageView(messageContainer);
      const messageModel = new MessageModel();

      userView.inputLogin(userModel);

      const loginObj = new Object({
        "email": userModel.getEmail(),
        "password": userModel.getPassword()
      })
      console.log(loginObj)
      try {
        const response = await this.fetchLogin(loginObj);
        const id = response[0].codigo;
        const token = response[0].authorization;
        const type = response[0].tipo;
        sessionStorage.setItem('userToken', token);
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('type', type);

        if(type === 'admin'){
          window.location.href = './src/pages/ticketAdminList.html';
        } else if(type === 'suporte'){
          window.location.href = './src/pages/ticketSupportList.html';
        } else if (type === 'cliente'){
          window.location.href = './src/pages/ticketClientList.html';
        }

      } catch(error){
        console.log(error);
        messageModel.setMessage(error)
        messageView.update(messageModel, 'error');
      }
    })
  }

  async fetchLogin(loginObj){
    let response = await fetch('http://192.168.0.31:3003/user/login', {
      method:'post', 
      headers:{
        'Content-Type':'application/json'
    },
      body: JSON.stringify(loginObj)
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