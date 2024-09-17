import { TicketController } from "../controllers/ticketContoller.js";
import { CategoryController } from "../controllers/categoryController.js";

document.addEventListener('DOMContentLoaded', async () => {
  const userToken = sessionStorage.getItem('userToken');
  const userType = sessionStorage.getItem('type');
  const userId = sessionStorage.getItem('id');

  if(userToken){

   
    const ticketContoller = new TicketController(userToken, userType);

    ticketContoller.handleEventTicketTable();
    ticketContoller.ticketsList(userId);

    ticketContoller.handleLogout();
    
  } else {
    window.location.href="../../index.html";
  }
})