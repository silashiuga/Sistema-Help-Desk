import { UserFormController } from "../controllers/userFormController.js";

document.addEventListener('DOMContentLoaded', async() => {
  const userToken = sessionStorage.getItem('userToken');
  const userType = sessionStorage.getItem('type');
  const idMySelf = sessionStorage.getItem('id');

  const params = new URLSearchParams(window.location.search)
  const handleUser = params.get('user');


  const title = document.querySelector('#title-form');

  if(userToken){


    title.innerHTML = `Editar ${handleUser}` 
    
    console.log(idMySelf)
    const activeBnt = document.querySelector('#activeInput').setAttribute('disabled', 'disabled');
    const inactiveBnt = document.querySelector('#inactiveInput').setAttribute('disabled', 'disabled');

    const userFormController = new UserFormController(userToken, userType);
    await userFormController.handleFillInInput(idMySelf, handleUser)
    userFormController.handleContainerEditMySelfBtn(idMySelf, handleUser);
    userFormController.handleLogout();
  } else {
    window.location.href="../../index.html";
  }
})