import { TicketPanelModel } from "../models/ticketPanelModel.js";
import { TicketPanelView } from "../views/ticketPanelView.js";
import { MessageView } from "../views/messageView.js";
import { MessageModel } from "../models/messageModel.js";


export class TicketPanelController {
  
  token;
  userType;
  ticket_id;
  user_id;
  
  constructor (token, userType, ticket_id, user_id){
    this.token = token;
    this.userType = userType;
    this.ticket_id = ticket_id;
    this.user_id = user_id;
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

  async handleSelectAction(){
    const selectSeverity = document.querySelector('#select-severity');
    const selectStatus = document.querySelector('#select-status');

    selectSeverity.addEventListener('click', (event)=>{
      event.preventDefault();
      this.changeTicketSeverity(event.target.value);
    });

    selectStatus.addEventListener('click', (event)=>{
      event.preventDefault();
      this.changeTicketStatus(event.target.value);
    });
  }

  async changeTicketSeverity(severity){

    const objSeverity = new Object({
      ticket_id:this.ticket_id,
      severity_id: severity,
    })

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {
      const changeSeverity = await this.fetchChangeTicketSeverity(objSeverity);
      if(changeSeverity.hasOwnProperty('info')){
        messageModel.setMessage(changeSeverity.info);
        messageView.update(messageModel, 'success');
        await this.findInfoTicket();
      }
    } catch(error){
      console.log(error);
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async fetchChangeTicketSeverity(objSeverity){
    const url = 'http://192.168.0.31:3003/ticket/changeTicketSeverity';
    console.log(url)
    let response = await fetch(url, {
      method:'put', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify(objSeverity)
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

  async changeTicketStatus(status){

    const objStatus = new Object({
      ticket_id:this.ticket_id,
      status_id: status,
    })

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {
      console.log(objStatus)
      const changeStatus = await this.fetchChangeTicketStatus(objStatus);
      if(changeStatus.hasOwnProperty('info')){
        messageModel.setMessage(changeStatus.info);
        messageView.update(messageModel, 'success');
        await this.findInfoTicket();
      }
    } catch(error){
      console.log(error);
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async fetchChangeTicketStatus(objStatus){
    const url = 'http://192.168.0.31:3003/ticket/changeTicketStatus';
    console.log(url)
    let response = await fetch(url, {
      method:'put', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify(objStatus)
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

  async handleBtnCloseTicket(){
    const containerBtnClose = document.querySelector('.container-btn-close');
    if(!containerBtnClose.classList.contains('ativo')){
      containerBtnClose.classList.add('ativo');
    }

    const btnClose = document.querySelector('.btn-close');
    btnClose.addEventListener('click', (event) => {
      event.preventDefault();

      this.closeTicket();
    })
  }

  handleBtnNewMessage(){
    const btnSend = document.querySelector('.send-message');

    btnSend.addEventListener('click', (event) => {
      event.preventDefault();

      this.sendMessage();
    })
  }

  async sendMessage(){

    const ticketPanelModel = new TicketPanelModel();
    const ticketPanelView = new TicketPanelView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();
    ticketPanelView.getInputMessage(ticketPanelModel);
    ticketPanelModel.setNewMessage(this.user_id, this.ticket_id, this.userType);

    try {
      const dataValidate = ticketPanelModel.validateMessage();

      if(dataValidate){
        throw new Error('Preencha a mensagem para enviar')
      }

      const newMessage = ticketPanelModel.getNewMessage();
      console.log(newMessage)
      const messageResult = await this.fetchSendMessage(newMessage);
      if(messageResult.hasOwnProperty('info')){
       
        messageModel.setMessage(messageResult.info);
        messageView.update(messageModel, 'success');
        this.findMessages()
    
      }
    } catch(error){
      console.log(error);
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }

  }

  async fetchSendMessage(newMessage){
    const url = 'http://192.168.0.31:3003/ticket/newMessage';
    console.log(url)
    let response = await fetch(url, {
      method:'post', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify(newMessage)
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

  async handleTicketManager( handleUser=0){
    const containerBtn = document.querySelector('.container-button');
    if(!containerBtn.classList.contains('ativo')){
      containerBtn.classList.add('ativo');
    }

    const btnTicket = document.querySelector('.btn-get-ticket');
    btnTicket.addEventListener('click', (event)=>{
      event.preventDefault();
      this.ticketManager('add');
    })

    if(this.userType === 'admin'){
      const btnRemove = document.querySelector('.btn-remove');
      btnRemove.addEventListener('click', (event) => {
        event.preventDefault();
        this.ticketManager('remove', handleUser);
      })
    }
  }

  async ticketManager(action, handleUser=0){


    let objSupport;
    if(action == 'add'){
      objSupport = new Object({
        action:action,
        ticket_id: this.ticket_id,
        support_id: this.user_id
      })
    }

    if (action == 'remove'){
      objSupport = new Object({
        action:action,
        ticket_id: this.ticket_id,
        support_id: handleUser
      })
    }

    console.log(objSupport)

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {
      const addEmployee = await this.fetchTicketManager(objSupport);
      if(addEmployee.hasOwnProperty('info')){
        messageModel.setMessage(addEmployee.info);
        messageView.update(messageModel, 'success');
        const containerBtn = document.querySelector('.container-button');
        if(this.userType === 'suporte'){
          containerBtn.classList.remove('ativo')
        }
        await this.findInfoTicket();
      }
    } catch(error){
      console.log(error);
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async fetchTicketManager(objSupport){
    const url = 'http://192.168.0.31:3003/ticket/employeeTicket';
    console.log(url)
    let response = await fetch(url, {
      method:'put', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify(objSupport)
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

  async closeTicket(){
    const containerBtnClose = document.querySelector('.container-btn-close');

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {
      const ticketClosed = await this.fetchCloseTicket();

      if(ticketClosed.hasOwnProperty('info')){
        if(!containerBtnClose.classList.contains('ativo')){
          containerBtnClose.classList.remove('ativo');
        }
        messageModel.setMessage(ticketClosed.info);
        messageView.update(messageModel, 'success');
        this.findInfoTicket();
      }
      
    } catch (error){
      console.log(error);
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async fetchCloseTicket(){
    const url = 'http://192.168.0.31:3003/ticket/closeTicket';
    console.log(url)
    let response = await fetch(url, {
      method:'put', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify({
        id:this.ticket_id,
        client_id:this.user_id,
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

  async findInfoTicket(){

    const ticketPanelModel = new TicketPanelModel();
    const ticketPanelView = new TicketPanelView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {
      const ticketFound = await this.fetchFindTicket();
      console.log(ticketFound)
      ticketPanelModel.setInfoTicket(ticketFound[0]);

      if(this.userType === 'cliente'){
        if(ticketFound[0].estado == 'aberto' || ticketFound[0].estado == 'andamento'){
          this.handleBtnCloseTicket();
        }
        ticketPanelView.fillInfoClientTicket(ticketPanelModel);

      } else if(this.userType === 'suporte' || this.userType === 'admin'){
        
        this.handleSelectAction();
        if(ticketFound[0].estado == 'fechado' || ticketFound[0].estado == 'concluído'){
          const selectSeverity = document.querySelector('#select-severity');
          const selectStatus = document.querySelector('#select-status');

          selectSeverity.setAttribute('disabled', true);
          selectStatus.setAttribute('disabled', true);
        }
  
        ticketPanelView.fillInfoEmployeeTicket(ticketPanelModel);
      }

      if(this.userType === 'suporte'){
        if(!ticketFound[0].suporte ){
          this.handleTicketManager()

        }
      } else if(this.userType === 'admin'){
        this.handleTicketManager(ticketFound[0].suporte_codigo);
      }
      
    } catch(error){
      console.log(error);
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async fetchFindTicket(){
    const url = `http://192.168.0.31:3003/ticket/findById?id=${this.ticket_id}`;
    console.log(url)
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

  async findMessages(){
    const ticketPanelModel = new TicketPanelModel();
    const ticketPanelView = new TicketPanelView();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    try {
      const listMessages = await this.fetchFindMessages();
      if(listMessages.length > 0){
        ticketPanelModel.setListMessages(listMessages);
        ticketPanelView.displayListMessages(ticketPanelModel);
      }
    } catch(error){
      console.log(error);
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async fetchFindMessages(){
    const url = `http://192.168.0.31:3003/ticket/listMessage?ticket_id=${this.ticket_id}`;
    console.log(url)
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
}