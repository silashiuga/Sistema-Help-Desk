export class MessageView {
  element
  constructor(element){
    this.element = element;
  }

  displayMessage(message,type){
    return `<div class="message ${type}"><p>${message.getMessage()}</p><div>`
  }

  update(message, type, back){

    if(type==='error' || type==='alert'){
      console.log(this.element)
      this.element.innerHTML = this.displayMessage(message, type)
      setTimeout(() => {
        
        this.element.innerHTML = '';
        
      }, 3000);
     
    } else {
      if(back == 'back'){
     
        const promise = new Promise((resolve, reject) => {
          this.element.innerHTML = this.displayMessage(message, type)
          setTimeout(() => {
            
            resolve(this.element.innerHTML = '');
            
          }, 1000);
        });

        promise.then(() =>{
          window.history.back()
        })
      } else {
        this.element.innerHTML = this.displayMessage(message, type)
          setTimeout(() => {
            
            this.element.innerHTML = '';
            
          }, 2000);

      }

    }

  }
  
}