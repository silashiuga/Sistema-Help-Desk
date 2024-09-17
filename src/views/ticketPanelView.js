export class TicketPanelView {
  fillInfoClientTicket(ticketPanelModel){
    
    const domInfoTicket = document.querySelectorAll('.info');
    const title = document.querySelector('.title-page');
    let { titulo, descricao, cliente, gravidade, data_criacao, suporte, estado, data_termino, categoria, codigo } = ticketPanelModel.getInfoTicket();
    title.innerText = `Chamado ${codigo}`
    domInfoTicket[0].innerText = titulo;
    domInfoTicket[1].innerText = gravidade;
    domInfoTicket[2].innerText = data_criacao.substring(0,10);
    if(!suporte){
      suporte = '--/---/---/';
    }
    domInfoTicket[3].innerText = suporte;
    domInfoTicket[4].innerText = descricao;
    domInfoTicket[5].innerText = estado;
    if(!data_termino){
      data_termino = '--/---/---/';
    }
    domInfoTicket[6].innerText = data_termino.substring(0,10);
    domInfoTicket[7].innerText = categoria;
    domInfoTicket[8].innerText = cliente;
  }


  fillInfoEmployeeTicket(ticketPanelModel){
    console.log('veio')
    const domInfoTicket = document.querySelectorAll('.info');
    const title = document.querySelector('.title-page');
    let { titulo, descricao, cliente, gravidade_codigo, data_criacao, suporte, estado_codigo, data_termino, categoria, codigo } = ticketPanelModel.getInfoTicket();
    title.innerText = `Chamado ${codigo}`
    domInfoTicket[0].innerText = titulo;
    domInfoTicket[1].value = gravidade_codigo;
    domInfoTicket[2].innerText = data_criacao.substring(0,10);
    if(!suporte){
      suporte = '--/---/---/';
    }
    domInfoTicket[3].innerText = suporte;
    domInfoTicket[4].innerText = descricao;
    domInfoTicket[5].value = estado_codigo;
    if(!data_termino){
      data_termino = '--/---/---/';
    }
    domInfoTicket[6].innerText = data_termino.substring(0,10);
    domInfoTicket[7].innerText = categoria;
    domInfoTicket[8].innerText = cliente;
  }
  
  displayListMessages(ticketPanelModel){
    const list = ticketPanelModel.getListMessages();
    const containerMessageHistory = document.querySelector('.container-message-history');

    const history = `
      ${ list.map((message) => {
          return `
            <div class="container-dialogue">
              <div class="container-dialogue-title">${message.nome +' - '+message.tipo+' '+message.data_criacao.substring(0,10)}</div>
              <div class="container-dialogue-content">${message.conteudo}</div>
            </div>
          `
        }).join('')   
      }
    `;
    containerMessageHistory.innerHTML = history;

  }

  getInputMessage(ticketPanelModel){
    let message = document.querySelector('#descriptionInput');
    ticketPanelModel.setContentMessage(message.value);
    message.value = '';
    message = '';
  }
}