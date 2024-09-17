const TicketValidation = require('../validations/ticketValidation.js');
const TicketRepository = require('../repositories/ticketRepository.js');

class TicketService {

  constructor(){
    this.ticketRepository = new TicketRepository();
  }

  ticketRepository;

  async create(data){
    console.log(data)
    const ticketValidation = new TicketValidation();
    const dataValidate = ticketValidation.createValidation(data);
    
    if(!dataValidate){
      throw new Error('Dado inválido');
    }
    console.log(data)
    const ticketCreated = await this.ticketRepository.create(data);
    return ticketCreated;
  }

  async findById(id){

    const ticketValidation = new TicketValidation();
    const idValidate = ticketValidation.checkId(id);

    if(!idValidate){
      throw new Error('Código de usuário inválido');
    }
   
    const ticketFound = await this.ticketRepository.findById(id);
    return ticketFound;
  }

  async list(data){

    const ticketValidation = new TicketValidation();
    data.category_id = +data.category_id;
    data.severity_id = +data.severity_id;
    data.status_id = +data.status_id;

    console.log(data)
    const categoryValidate = ticketValidation.checkFilter(data.category_id);
    const severityValidate = ticketValidation.checkFilter(data.severity_id);
    const statusValidate = ticketValidation.checkFilter(data.status_id);
    const orderCreate = ticketValidation.checkOrderCreate(data.orderCreate);

    if(!categoryValidate || !severityValidate || !statusValidate || !orderCreate){
      throw new Error('Informação de filtro inválido');
    }
   
    const lsitFound = await this.ticketRepository.list(data);
    return lsitFound;
  }

  async findByClient(id){

    const ticketValidation = new TicketValidation();
    const idValidate = ticketValidation.checkId(id);

    if(!idValidate){
      throw new Error('Código de usuário inválido');
    }
   
    const ticketFound = await this.ticketRepository.findByClient(id);
    console.log(id)
    return ticketFound;
  }

  async findByCategory(id){

    const categoryFound = await this.ticketRepository.findByCategory(id);
    console.log('findById')
    return categoryFound;
  }

  async createMessage(data, userId){
    // user_id
    // data
    // conteudo
    const ticketValidation = new TicketValidation();
    const idValidate = ticketValidation.checkId(data.user_id);
    const dateValidate = ticketValidation.checkDateCreate(data.date_created);
    const contentValidate = ticketValidation.checkDescription(data.content);
    const ticketValidate = ticketValidation.checkDescription(data.ticket_id);
    
    if(!idValidate || !dateValidate || !contentValidate || !ticketValidate){
      throw new Error('Dado inválido'); 
    }
   
    const ticketFound = await this.ticketRepository.findById(data.ticket_id);

    if(ticketFound.length > 0){
      console.log('tipo')
      console.log(data.type)
      if(ticketFound[0].estado === 'concluído' || ticketFound[0].estado === 'fechado'){
        throw new Error('Ticket não pode ser alterado, por estar finalizado');
      }

      if(data.user_id != userId){
        throw new Error('Apenas o usuário logado pode mandar está mensagem');
      }

      if( data.type == 'client' ){
        if(ticketFound[0].cliente_codigo != data.user_id){
          throw new Error('Cliente não corresponde ao ticket');
        }
      } else if ( data.type == 'admin' || data.type == 'suporte'){
        console.log('passou')
        //Verifica se o ticket tem suporte
        
        if(!ticketFound[0].suporte_codigo){
          throw new Error('Suporte não encontrado');
        } else {
          // Se houver tem que corresponder ao usuário informado.
 
          if(ticketFound[0].suporte_codigo != data.user_id){
            throw new Error('funcionário não corresponde ao ticket');
          }
        }
      }

      const newMessage = await this.ticketRepository.sendMessage(data);
      return newMessage;
    } else {
      throw new Error('Ticket não encontrado');
    }
    return ticketFound;
  }

  async findByEmployee(id){

    const ticketValidation = new TicketValidation();
    const idValidate = ticketValidation.checkId(id);

    if(!idValidate){
      throw new Error('Código de usuário inválido');
    }
   
    const ticketFound = await this.ticketRepository.findByEmployee(id);
    return ticketFound;
  }

  async findEmployeeByMessage(id){

    const ticketValidation = new TicketValidation();
    const idValidate = ticketValidation.checkId(id);

    if(!idValidate){
      throw new Error('Código de usuário inválido');
    }
   
    const ticketFound = await this.ticketRepository.findEmployeeByMessage(id);
    return ticketFound;
  }

  async listMessage(id){

    const ticketValidation = new TicketValidation();
    const idValidate = ticketValidation.checkId(id);

    if(!idValidate){
      throw new Error('Código de ticket inválido');
    }
   
    const ticketFound = await this.ticketRepository.listMessage(id);
    return ticketFound;
  }

  async closeTicket(data, userInactive=false){
    const ticketValidation = new TicketValidation();
    const dataValidate = ticketValidation.checkId(data.id);
    console.log('veio2')
    if(!dataValidate){
      throw new Error('Dado inválido');
    }
    const objDate = new Date();
    const date = `${objDate.getFullYear()}-${objDate.getMonth() + 1  < 10? '0'+(objDate.getMonth()+1): objDate.getMonth()+1}-${objDate.getDate() + 1 < 10 ? '0'+objDate.getDate() : objDate.getDate()}`;
    data.date_finish = date;

    const closeTicket = await this.ticketRepository.closeTicket(data, userInactive);
    return closeTicket;
  }

  async removeInactiveEmployeeTicket(support_id){
    const removeEmployeeTicket = await this.ticketRepository.removeEmployeeTicket(support_id, true);
    return removeEmployeeTicket;
  }

  async employeeTicket(data, userId=0){

    const ticketValidation = new TicketValidation();
    const ticketValidate = ticketValidation.checkId(data.ticket_id);

      if(!ticketValidate){
        throw new Error('Dado inválido');
      }

    const checkTicket = await this.ticketRepository.findById(data.ticket_id);

    if(checkTicket[0].estado === 'concluído' || checkTicket[0].estado === 'fechado'){
      throw new Error('Ticket não pode ser alterado, por estar finalizado');
    }

    if(data.action === 'remove'){
      const employeeValidate = ticketValidation.checkId(data.support_id);
      console.log(data)
      if(!employeeValidate){
        throw new Error('Não foi encontrado suporte');
      }

      if(!checkTicket[0].suporte_codigo){
        throw new Error('Não há alguém responsável pelo ticket');

      } else if(checkTicket[0].suporte_codigo != data.support_id){
        throw new Error('Outro funcinário já está com este ticket');
      }

      const removeEmployeeTicket = await this.ticketRepository.removeEmployeeTicket(data.ticket_id, false);
      return removeEmployeeTicket;
    }

    else if(data.action === 'add'){
      console.log(data)

      if(checkTicket[0].suporte){
        throw new Error('Não é possível adicionar pois já tem alguém responsável pelo ticket');
      }

      if(userId != data.support_id){
        throw new Error('Apenas o próprio suporte ou adminsitrador deve se adicionar no ticket');
      }
      
      const addEmployeeTicket = await this.ticketRepository.addEmployeeTicket(data);
      return addEmployeeTicket;
    } else {
      throw new Error('Opção inválida');
    }
    
  }

  async changeTicketSeverity(data, userId){
    const ticketValidation = new TicketValidation();
    const ticketValidate = ticketValidation.checkId(data.ticket_id);
    const severityValidate = ticketValidation.checkId(data.severity_id);

    if(!ticketValidate || !severityValidate){
      throw new Error('Dado inválido');
    }

    const ticketFound = await this.ticketRepository.findById(data.ticket_id);
 
    if(ticketFound.length > 0){
      if(ticketFound[0].estado === 'concluído' || ticketFound[0].estado === 'fechado' ){
        throw new Error('Ticket não pode ser alterado, por estar finalizado');
      }
      if(ticketFound[0].suporte_codigo){
        if(ticketFound[0].suporte_codigo != userId){
          throw new Error('Apenas o suporte ou admin responsável pelo ticket pode alterar a gravidade');
        } else {
          const severityUpdated = await this.ticketRepository.changeTicketSeverity(data);
          return severityUpdated;
        }
      } else {
        throw new Error('Não foi encontrado responsável pelo ticket');
      }
    } else {
      throw new Error('Ticket não encontrado');
    }
  }

  async changeTicketStatus(data, userId){
    const ticketValidation = new TicketValidation();
    const dataValidate = ticketValidation.checkId(data.status_id);
    
    if(!dataValidate){
      throw new Error('Dado inválido');
    }

    const ticketFound = await this.ticketRepository.findById(data.ticket_id);
 
    if(ticketFound.length > 0){
      if(ticketFound[0].estado === 'concluído' || ticketFound[0].estado === 'fechado' ){
        throw new Error('Ticket não pode ser alterado, por estar finalizado');
      }
      // É necessário que haja um suporte no para alterar para 'andamento', 'concluído', 'aberto'
      if(data.status_id == 2 || data.status_id == 3 || data.status_id == 1){
        if(!ticketFound[0].suporte_codigo){
          throw new Error('É necessário um suporte ou admin responsável pelo ticket');
          // A alteração só ocorre pelo responsável do ticket
        } else if(ticketFound[0].suporte_codigo != userId){
          throw new Error('Apenas o suporte ou admin responsável pelo ticket pode alterar este status');
        }
      }

    } else {
      throw new Error('Ticket não encontrado');
    }

    let date_finish = null;

    if(data.status_id == 3 || data.status_id == 4){
      const objDate = new Date();
      date_finish = `${objDate.getFullYear()}-${objDate.getMonth() + 1  < 10? '0'+(objDate.getMonth()+1): objDate.getMonth()+1}-${objDate.getDate() + 1 < 10 ? '0'+objDate.getDate() : objDate.getDate()}`;
    }

    const ticketCreated = await this.ticketRepository.changeTicketStatus(data, date_finish);
    return ticketCreated;
  }
}

module.exports = TicketService;