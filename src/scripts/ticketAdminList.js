import { TicketController } from "../controllers/ticketContoller.js";
import { CategoryController } from "../controllers/categoryController.js";

document.addEventListener('DOMContentLoaded', async () => {
  const userToken = sessionStorage.getItem('userToken');
  const userType = sessionStorage.getItem('type');

  if(userToken){

   
    const ticketContoller = new TicketController(userToken, userType);
    const categoryController = new CategoryController(userToken);

    await categoryController.selectCategory(2, 'list');
    ticketContoller.handleFilterAction();
    ticketContoller.ticketsList();

    ticketContoller.handleLogout();
    
  } else {
    window.location.href="../../index.html";
  }
})