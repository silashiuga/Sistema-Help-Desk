import { CategoryController } from "../controllers/categoryController.js";

document.addEventListener('DOMContentLoaded', async () => {
  const userToken = sessionStorage.getItem('userToken');
  const userType = sessionStorage.getItem('type');

  if(userToken){
    
    const categoryController = new CategoryController(userToken, userType);
    if(userType === 'admin'){
      const adminMenu = document.querySelector('#adminMenu');
      const supportMenu = document.querySelector('#supportMenu');

      if(supportMenu){
        if(supportMenu.classList.contains('ativo')){
          supportMenu.classList.remove('ativo');
        }
      }

      if(adminMenu){
        if(!adminMenu.classList.contains('ativo')){
          adminMenu.classList.add('ativo');
        }
      }
    } else if(userType === 'suporte') {
      const adminMenu = document.querySelector('#adminMenu');
      const supportMenu = document.querySelector('#supportMenu');

      if(adminMenu){
        if(adminMenu.classList.contains('ativo')){
          adminMenu.classList.remove('ativo');
        }
      }

      if(supportMenu){
        if(!supportMenu.classList.contains('ativo')){
          supportMenu.classList.add('ativo');
        }
      }

      // const id = sessionStorage.getItem('id');
      // categoryController.handleAccount(id);
    }
    categoryController.handleEventTable();
    await categoryController.listTable();
    
    categoryController.handleBtnCreate();
    categoryController.handleContainerCreateModal();
    categoryController.handleContainerUpdateModal();
    categoryController.handleBtnCloseCreateModal();
    categoryController.handleBtnCloseUpdateModal();
    categoryController.handleBtnCreateModal();
    categoryController.handleBtnUpdateModal();
    categoryController.handleBtnDeleteModal();
   
    categoryController.handleLogout();

  } else {
    window.location.href='../index.html';
  }
})