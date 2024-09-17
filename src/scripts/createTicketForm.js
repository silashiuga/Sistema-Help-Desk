import { TicketController } from "../controllers/ticketContoller.js";
import { CategoryController } from "../controllers/categoryController.js";

document.addEventListener('DOMContentLoaded', async () => {
  const userToken = sessionStorage.getItem('userToken');
  const userType = sessionStorage.getItem('type');
  const userId = sessionStorage.getItem('id');

  if(userToken){

   
    const ticketContoller = new TicketController(userToken, userType);
    const categoryController = new CategoryController(userToken);
    await categoryController.selectCategory(1, 'createTicket');
    ticketContoller.handleCreateTicket(userId);
    ticketContoller.handleLogout();
    ticketContoller.handleCancelTicketButtonForm();
  } else {
    window.location.href="../../index.html";
  }
})