export class MessageModel {

  message;

  getMessage(){
    return this.message;
  }

  setMessage(message){
    this.message = message;
    console.log(this.message)
  }

}