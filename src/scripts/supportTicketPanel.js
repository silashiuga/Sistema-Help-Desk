import { TicketPanelController } from "../controllers/ticketPanelController.js";

document.addEventListener('DOMContentLoaded', async() => {
  const userToken = sessionStorage.getItem('userToken');
  const userType = sessionStorage.getItem('type');
  const user_id = sessionStorage.getItem('id')

  const params = new URLSearchParams(window.location.search)
  const idTicket = params.get('codigo');
  if(userToken){

    const ticketPanelController = new TicketPanelController(userToken, userType, idTicket, user_id);
    await ticketPanelController.findInfoTicket();
    await ticketPanelController.findMessages();
    ticketPanelController.handleBtnNewMessage();
    ticketPanelController.handleLogout();

  } else {
    window.location.href="../../index.html";
  }
})