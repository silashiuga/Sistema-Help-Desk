import { UserController } from "../controllers/userController.js";

document.addEventListener('DOMContentLoaded', async() => {
  const userToken = sessionStorage.getItem('userToken');
  const userType = sessionStorage.getItem('type');

  const params = new URLSearchParams(window.location.search)
  const userList = params.get('user');
  if(userToken){

    const userController = new UserController(userToken, userType);
    await userController.adminList(userList);
    userController.handleLogout();
  } else {
    window.location.href="../../index.html";
  }
})