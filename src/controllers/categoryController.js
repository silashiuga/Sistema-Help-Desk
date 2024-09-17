import { CategoryModel } from "../models/categoryModel.js";
import { CategoryView } from "../views/categoryView.js";
import { MessageView } from "../views/messageView.js";
import { MessageModel } from "../models/messageModel.js";


export class CategoryController {

  modelCategoryEdit
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
      exit = '.logout-support'
    }
    const logout = document.querySelector(exit);
    console.log(this.userType)
    logout.addEventListener('click', (event)=> {
      event.preventDefault();
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('type');

      window.location.href = "../../index.html";
    })
  }

  // Add event listener, para fechar o modal create se o usuário clicar fora 
  handleContainerCreateModal(){
    const containerCreateModal = document.querySelector('.modal-create-container');
    containerCreateModal.addEventListener('click', (event)=>{
      
      if(event.target === containerCreateModal){
        event.preventDefault();
        this.closeCreateModal();
      }
    })
  }

  // Add event listener, para fechar o modal update se o usuário clicar fora 
  handleContainerUpdateModal(){
    const containerUpdateModal = document.querySelector('.modal-update-container');
    containerUpdateModal.addEventListener('click', (event)=>{
      
      if(event.target === containerUpdateModal){
        event.preventDefault();
        this.closeUpdateModal();
      }
    })
  }

  // Se o usuário clicar no botão de fechar o modal de create
  handleBtnCloseCreateModal(){
    const btnClose = document.querySelector('#btn-close-create');
    btnClose.addEventListener('click', (event)=>{
      event.preventDefault();
      this.closeCreateModal();
    })
  }

   // Se o usuário clicar no botão de fechar o modal de update
   handleBtnCloseUpdateModal(){
    const btnClose = document.querySelector('#btn-close-update');
    btnClose.addEventListener('click', (event)=>{
      event.preventDefault();
      this.closeUpdateModal();
    })
  }

  // Se o usuário clicar em criar dentro do modal
  handleBtnCreateModal(){
    const btnCreate = document.querySelector('.btn-create');
    btnCreate.addEventListener('click', (event)=>{
      event.preventDefault();
      this.createCategory();
    })
  }

  // Se o usuário clicar em atualizar dentro do modal
  handleBtnUpdateModal(){
    const btnCreate = document.querySelector('.btn-update');
    btnCreate.addEventListener('click', (event)=>{
      event.preventDefault();
      console.log('foi')
      this.updateCategory();
    })
  }

  // Se o usuário clicar em delete dentro do modal
  handleBtnDeleteModal(){
    const btnDelete = document.querySelector('.btn-delete');
    btnDelete.addEventListener('click', (event)=>{
      event.preventDefault();
      this.deleteCategory();
    })
  }

  // Se o usuário clicar no botão de adicionar
  handleBtnCreate(){
    const createBtn = document.querySelector('.add-btn');
    createBtn.addEventListener('click', (event)=>{
      event.preventDefault();
      this.openCreateModal();
    })
  }

   //Abrir modal create
   openCreateModal(){
    const modal = document.querySelector('.modal-create-container');
    modal.classList.add('active');
  }

  //Fechar modal create
  closeCreateModal(){
    //Resetar o conteúdo do modal;
    const modal = document.querySelector('.modal-create-container');
    const form = document.forms.create.elements;
    const categoryView = new CategoryView();
    categoryView.resetModal(form);
    //Apagar o modal create;
    modal.classList.remove('active');
  }

  //Abrir o modal de update
  openUpdateModal(element){
    const modal = document.querySelector('.modal-update-container');
    modal.classList.add('active');

    this.modelCategoryEdit = new CategoryModel();
    const categoryView = new CategoryView();

    const name = element.dataset.name;
    const id = element.dataset.id;
    const status = element.dataset.status;

    this.modelCategoryEdit.setId(id);

    categoryView.setInputValue(name, status);
    console.log("update modal")
  }

  //Fechar o modal de update
  closeUpdateModal(){
    //Resetar o conteúdo do modal;
    const modal = document.querySelector('.modal-update-container');
    const form = document.forms.update.elements;
    const categoryView = new CategoryView();
    categoryView.resetModal(form);
    //Apagar o modal create;
    modal.classList.remove('active');
  }

  async createCategory(){

    const categoryModel = new CategoryModel();
    const categoryView = new CategoryView();

    const messageContainer = document.querySelector('.message-container');

    const messageModel = new MessageModel();
    const messageView = new MessageView(messageContainer);
    try{
      categoryView.getInputValue(categoryModel);

      const objCategory = new Object({
        "name":categoryModel.getName(),
        "situation":categoryModel.getSituation()
      })
      console.log(objCategory)
      const result = await this.fetchCreateCategory(objCategory);

      if(result.hasOwnProperty('info')){
        messageModel.setMessage(result.info)
        messageView.update(messageModel, 'success');

        await this.listTable();
        this.closeCreateModal();
      }

    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
      console.log(error)
    }
  }

  async fetchCreateCategory(objCategory){
    let response = await fetch('http://192.168.0.31:3003/category/create', {
      method:'post', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify(objCategory)
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

  async updateCategory(){

    const categoryView = new CategoryView();

    const messageContainer = document.querySelector('.message-container');
    const messageModel = new MessageModel();
    const messageView = new MessageView(messageContainer);

    categoryView.getInputValueUpdate(this.modelCategoryEdit);

    try{

      const objCategory = new Object({
        id:this.modelCategoryEdit.getId(),
        name:this.modelCategoryEdit.getName(),
        situation:this.modelCategoryEdit.getSituation()
      })

      const categoryUpdated = await this.fetchUpdateCategory(objCategory);

      if(categoryUpdated.hasOwnProperty('info')){
        messageModel.setMessage(categoryUpdated.info);
        messageView.update(messageModel, 'success');
        this.closeUpdateModal();
        await this.listTable();
      }
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
      console.log(error)
    }
  }

  async fetchUpdateCategory(ObjCategory){
    let response = await fetch('http://192.168.0.31:3003/category/update', {
      method:'put', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify(ObjCategory)
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

  async deleteCategory(){
    const messageContainer = document.querySelector('.message-container');
    const messageModel = new MessageModel();
    const messageView = new MessageView(messageContainer);

    try{
      const objCategory = new Object({
        category_id: this.modelCategoryEdit.getId()
      })

      const categoryDeleted = await this.fetchDeleteCategory(objCategory);

      if(categoryDeleted.hasOwnProperty('info')){
        messageModel.setMessage(categoryDeleted.info);
        messageView.update(messageModel, 'success');
        this.closeUpdateModal();
        await this.listTable();
      }
    } catch(error){
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
      console.log(error)
      this.closeUpdateModal();
    }
  }

  async fetchDeleteCategory(objCategory){
    let response = await fetch('http://192.168.0.31:3003/category/delete', {
      method:'delete', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${this.token}`
      },
      body: JSON.stringify(objCategory)
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

  handleEventTable(){
    const containerTable = document.querySelector('#table-container');
    containerTable.addEventListener('click', (event)=> {
      if(event.target.closest('.btn-edit')){
        console.log(event.target.parentNode)
        this.openUpdateModal(event.target.parentNode);
      }
    });
  }

  async listTable(){
    const categoryModel = new CategoryModel();
    const categoryView = new CategoryView();

    const messageContainer = document.querySelector('.message-container');
    const messageModel = new MessageModel();
    const messageView = new MessageView(messageContainer);
  
    try{
      const list = await this.fetchCategoryList(2);

      // if(list.length == 0){
      //   throw new Error('Categoria não encontrada');
      // }
      categoryModel.setCategoryList(list);

     
      categoryView.categoryTable(categoryModel);

    } catch(error){
      console.log(messageView)
      messageModel.setMessage(error)
      messageView.update(messageModel, 'error');
    }
  }

  async fetchCateogryTable(situation){
    let response = await fetch(`http://192.168.0.31:3003/category/findBySituation?situation=${situation}`, {
      method:'get', 
      headers:{
        'Content-Type':'application/json',
        'authorization-token':`${token}`
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

  async selectCategory(situation, action){ 
    const categoryView = new CategoryView();
    
    const list = await this.fetchCategoryList(situation);

    if(action === 'list'){
      categoryView.configureCategory(list);
    } else if (action === 'createTicket'){
      categoryView.configureCategoryinCreateTicket(list)
    }
  }

  async fetchCategoryList(situation){
    let response = await fetch(`http://192.168.0.31:3003/category/findBySituation?situation=${situation}`, {
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
}