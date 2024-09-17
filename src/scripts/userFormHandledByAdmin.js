import { UserFormController } from "../controllers/userFormController.js";

document.addEventListener('DOMContentLoaded', async() => {
  const userToken = sessionStorage.getItem('userToken');
  const userType = sessionStorage.getItem('type');

  const params = new URLSearchParams(window.location.search)
  const handleUser = params.get('user');
  const action = params.get('action');
  const id = params.get('codigo');

  const title = document.querySelector('#title-form');

  if(userToken){


    if(action === 'rg'){

      if(title){
        title.innerHTML = `Cadastrar ${handleUser}`
      }
      const userFormController = new UserFormController(userToken, userType);
      userFormController.handleContainerCreateBtn(handleUser);
  
      userFormController.handleLogout();
    } else if(action === 'edit'){
      if(title){
        title.innerHTML = `Editar ${handleUser}` 
      }
      const userFormController = new UserFormController(userToken, userType);
      await userFormController.handleFillInInput(id, handleUser)
      userFormController.handleContainerEditBtn(id, handleUser);
      userFormController.handleUserDeleteBtn(id, handleUser);
    }
    

  } else {
    window.location.href="../../index.html";
  }
})