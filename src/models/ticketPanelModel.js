export class TicketPanelModel {

  ticketFound;
  listMessages;


  message;
  id_user;
  idTicket;
  date_created;
  userType;

  setInfoTicket(ticketFound){
    this.ticketFound = ticketFound;
  }

  getInfoTicket(){
    return this.ticketFound;
  }

  setListMessages(listMessages){
    this.listMessages = listMessages;
  }

  getListMessages(){
    return this.listMessages;
  }

  setNewMessage(id_user, idTicket, userType){
    this.id_user = id_user;
    this.idTicket = idTicket;
    const objDate = new Date();
    this.date_created = `${objDate.getFullYear()}-${objDate.getMonth() + 1  < 10? '0'+(objDate.getMonth()+1): objDate.getMonth()+1}-${objDate.getDate() + 1 < 10 ? '0'+objDate.getDate() : objDate.getDate()}`;
    this.userType = userType;
  }

  validateMessage(){
    if(!this.message){
      return true;
    }
    return false;
  }

  setContentMessage(message){
    this.message = message;
  }

  getNewMessage(){
    return new Object({
      user_id: this.id_user,
      date_created:this.date_created,
      content:this.message,
      ticket_id:this.idTicket,
      type: this.userType,
    })
  }

}