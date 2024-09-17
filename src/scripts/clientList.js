import { UserController } from "../controllers/userController.js";

document.addEventListener('DOMContentLoaded', async() => {
  const userToken = sessionStorage.getItem('userToken');
  const userType = sessionStorage.getItem('type');

  const params = new URLSearchParams(window.location.search)
  const userList = params.get('user');

  if(userToken){
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
      
      const userController = new UserController(userToken, userType);
      
      userController.handleAddClientBtn();
      await userController.clientList(userList);
      userController.handleLogout();

    } else if(userType === 'suporte'){
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
    
      const userController = new UserController(userToken, userType);
      userController.handleAddClientBtn();

      await userController.clientList(userList);
      userController.handleLogout();
    }
  } else {
    window.location.href="../../index.html";
  }
})