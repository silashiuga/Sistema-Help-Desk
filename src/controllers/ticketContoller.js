import { TicketModel } from "../models/ticketModel.js";
import { TicketView } from "../views/ticketView.js";
import { MessageView } from "../views/messageView.js";
import { MessageModel } from "../models/messageModel.js";

export class TicketController{

  token;
  userType;

  constructor(token, type){
    this.token = token;
    this.userType = type;
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
    console.log(logout)
    logout.addEventListener('click', (event)=> {
      event.preventDefault();
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('type');

      window.location.href = "../../index.html";
    })
  }

  handleEventTicketTable(){
    const containerTable = document.querySelector('#table-container');
    containerTable.addEventListener('click', (event)=> {
      if(event.target.closest('.ticketEdit')){
        if(this.userType === 'admin'){

        } else if (this.userType === 'suporte'){

        } else if(this.userType === 'cliente'){
          window.location.href = './clientTicketPanel.html';
        }
      }
    });
  }

  handleCancelTicketButtonForm(){
    const cancelButton = document.querySelector('.btn-cancel');
    cancelButton.addEventListener('click', (event) => {
      event.preventDefault();

      window.history.back();
    })
  }

  handleCreateTicket(clientId){
    const createBtn = document.querySelector('.btn-create');

    const severitySelect = document.querySelector('.severity');

    if(!severitySelect.value){
      severitySelect.selectedIndex = 0;
    }
    console.log(clientId)
    createBtn.addEventListener('click', (event) => { 
      event.preventDefault();

      this.createTicket(clientId);
    })
  }

  async createTicket(clientId){

    // const form = document.forms.createTicket.elements

    const ticketView = new TicketView();
    const ticketModel = new TicketModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();

    ticketView.getInputValue(ticketModel);

    try {
      const dataValidate = ticketModel.dataValidate();
      if(dataValidate.status){
        throw new Error(dataValidate.content)
      }

      const objTicket = ticketModel.objTicketforCreate(clientId);
      console.log(objTicket)
      const ticketCreated = await this.fetchCreateTicket(objTicket);

      if(ticketCreated.hasOwnProperty('info')){
        messageModel.setMessage(ticketCreated.info);
        messageView.update(messageModel, 'success', 'back');
      }

    } catch(error){
      console.log(error);
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error'); 
    }
  }

  async fetchCreateTicket(objTicket){
    let response = await fetch('http://192.168.0.31:3003/ticket/create', {
      method:'post', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify(objTicket)
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

  handleFilterAction(){
    const filterCategory = document.getElementById('listCategory');
    filterCategory.addEventListener('change', (item) => {
      this.ticketsList()
    });

    const filterDate = document.getElementById('filter-date');

    if(!filterDate.value){
      filterDate.selectedIndex = 0;
    }

    filterDate.addEventListener('change', ()=> {
      this.ticketsList()
    });

    const filterStatus = document.getElementById('filter-status');

    if(!filterStatus.value){
      filterStatus.selectedIndex = 0;
    }

    filterStatus.addEventListener('change', ()=> {
      this.ticketsList();
    })

    const filterSeverity = document.getElementById('filter-severity');

    if(!filterSeverity.value){
      filterSeverity.selectedIndex = 0;
    }

    filterSeverity.addEventListener('change', () => {
      this.ticketsList();
    })
  }

  async ticketsList(id=0){
    const ticketView = new TicketView();
    const ticketModel = new TicketModel();

    const messageContainer = document.querySelector('.message-container');
    const messageView = new MessageView(messageContainer);
    const messageModel = new MessageModel();
    try {
      let list;
      if(this.userType === 'admin' || this.userType === 'suporte'){
        ticketView.captureValueFilter(ticketModel);
        const filterCategory = ticketModel.getFilterCategory();
        const filterDate = ticketModel.getFilterDate();
        const filterStatus = ticketModel.getFilterStatus();
        const filterSeverity = ticketModel.getFilterSeverity();
        
        list = await this.fechEmployeeTicketsList(filterCategory, filterDate, filterStatus, filterSeverity);
      } else {
        list = await this.fechClientTicketsList(id);
      }

      ticketView.ticketTable(list, this.userType);
    } catch(error){
      console.log(error);
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error'); 
    }
  }

  async fechClientTicketsList(id){
    const url = `http://192.168.0.31:3003/ticket/findByClient?id=${id}`;
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

  async fechEmployeeTicketsList(filterCategory, filterDate, filterStatus, filterSeverity){
    const url = `http://192.168.0.31:3003/ticket/list?category_id=${filterCategory}&orderCreate=${filterDate}&severity_id=${filterSeverity}&status_id=${filterStatus}`;
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