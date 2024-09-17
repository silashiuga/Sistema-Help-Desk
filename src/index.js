import { UserController } from "./controllers/userController.js";

document.addEventListener('DOMContentLoaded', async ()=>{
  const userController = new UserController();
  await userController.handleLogin();
})