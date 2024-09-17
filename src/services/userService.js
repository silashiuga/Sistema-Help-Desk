const UserRepository = require('../repositories/userRepository.js');
const UserValidation = require('../validations/userValidation.js');
const TicketService = require('../services/ticketService.js');
const bcrypt = require('bcryptjs');

class UserService {
  constructor(){
    this.userRepository = new UserRepository();
  }

  userRepository;

  async checkUserExistence(email, name, action, id=0){
    const findUserByEmail = await this.userRepository.findByEmail(email);
    const findUserByName = await this.userRepository.findUserByName(name);
 
    let nameValid = false;
    let emailValid = false;

    if(action == 'create'){
      if(findUserByEmail.length > 0){
        emailValid = false;
      } else {
        emailValid = true;
      }

      if(findUserByName.length > 0){
        nameValid = false;
      } else {
        nameValid = true;
      }

      if(emailValid && nameValid){
        return true;
      }

      return false;
      
    }

    if(action == 'update'){
    
      let nameValid = false;
      let emailValid = false;

      if(findUserByEmail.length > 0){

        if(findUserByEmail[0].codigo == id){
          emailValid =  true;
        } else {
          emailValid = false;
        }
      } else {
        emailValid =  true
      }
      
      if(findUserByName.length > 0){

        if(findUserByName[0].codigo == id){
          nameValid =  true;
        } else {
          nameValid = false;
        }
      } else {
        nameValid =  true;
      }

      if(emailValid && nameValid){
        return true;
      }

      return false;
    }
  }

  async login(data){
    const {email, password} = data;

    const userValidation = new UserValidation();

    const validInputEmail = userValidation.checkEmail(email);
    const validInputPassword = userValidation.checkPassword(password);

    if(!validInputEmail){
      throw new Error('Email no formato inválido');
    }

    if(!validInputPassword){
      throw new Error('Senha no formato inválido');
    }

    const user = await this.userRepository.findByEmail(data.email);
    if(user.length === 0){
      throw new Error('Email ou senha incorreto.');
    }

    const passwordCompare = bcrypt.compareSync(data.password, user[0].senha);

    if(!passwordCompare){
      throw new Error('Email ou senha incorreto');
    }

    if(user[0].situacao === 0){
      throw new Error('Usuário inativo no sistema');
    }

    return user;
  }

  async closeTicket(id){
    const ticketService = new TicketService();
    const ticketClosed = await ticketService.closeTicket({date_finish: '', id: id} ,true);
    console.log('retornou')
    return ticketClosed;
  }

  async checkAdminActive(){
    const adminActive = await this.userRepository.checkAdminActive();
    if(adminActive.length > 1){
      return true;
    } else {
      return false;
    }
  }

  async delete(data){
    const userValidation = new UserValidation();
    const dataValidate = userValidation.checkId(data.id);
    console.log(data.id)
    if(!dataValidate){
      throw new Error('Dado inválido');
    }

    const userFound = await this.userRepository.findById(data.id);

    if(userFound.length > 0){

      if(userFound[0].tipo === 'admin'){
        const ticketService = new TicketService();
        const adminOnTicket = await ticketService.findByEmployee(data.id);
        const adminOnMessage = await ticketService.findEmployeeByMessage(data.id);
       
        if(adminOnTicket.length > 0 || adminOnMessage.length > 0){
          throw new Error('Não pode ser deletado por estar em registro de ticket')
        } else {
          if(userFound[0].situacao === 1){
            const isNotUnique = await this.checkAdminActive();
            if(isNotUnique){
              const adminRemoved = await this.userRepository.delete(data.id);
              return adminRemoved;
            } else {
              throw new Error('Deve haver pelo menos um admin ativo no sistema');
            }
          } else {
            const adminRemoved = await this.userRepository.delete(data.id);
            return adminRemoved;
          }
        }
      } else if (userFound[0].tipo === 'suporte'){
        const ticketService = new TicketService();
        const suporteOnTicket = await ticketService.findByEmployee(data.id);
        const suportOnMessage = await ticketService.findEmployeeByMessage(data.id);

        if(suporteOnTicket.length > 0 || suportOnMessage.length > 0){
          throw new Error('Não pode ser deletado por estar em registro de ticket')
        } else {
          const suportRemoved = await this.userRepository.delete(data.id);
          return suportRemoved;
        }
      } else {
        const ticketService = new TicketService();
        const clientOnTicket = await ticketService.findByClient(data.id);
        console.log(clientOnTicket)
        if(clientOnTicket.length > 0){
          throw new Error('Não pode ser deletado por já estar registrado em pelo menos um ticket')
        } else {
          const clientRemoved = await this.userRepository.delete(data.id);
          return clientRemoved;
        }
      }
    }
  }

  async update(data){

    const userValidation = new UserValidation();
    const validateData =  userValidation.updateValidation(data);

    if(!validateData){
      throw new Error('Dado invalido');
    }
   
    const userValidate = await this.checkUserExistence(data.email, data.name, 'update', data.id);
  
    if(!userValidate){
      throw new Error('O email ou nome(username) já está em uso');
    }

    const ticketService = new TicketService();

    if(data.type === 'admin' && data.situation === 0){
      const checkAdmin = await this.checkAdminActive();
      if(!checkAdmin){
        throw new Error('Deve haver pelo menos um admin ativo no sistema');
      }
    }

    if(data.password){
      data.password = bcrypt.hashSync(data.password);
      const userUpdated = await this.userRepository.update(data);

      if(data.type == 'cliente' && data.situation === 0){
        if(userUpdated.hasOwnProperty('info')){
         
          const findTicket = await ticketService.findByClient(data.id);

          if(findTicket.length > 0){
           
            const ticketClosed = await this.closeTicket(data.id);
            if(ticketClosed.hasOwnProperty('info')){
            return {info: `${userUpdated.info} e ${ticketClosed.info}`}
            }
          }
        }
      } if((data.type == 'suporte' || data.type == 'admin') && data.situation === 0){
          if(userUpdated.hasOwnProperty('info')){
          
            const findTicket = await ticketService.findByEmployee(data.id);

            if(findTicket.length > 0){
              const employeeRemoved =  await ticketService.removeInactiveEmployeeTicket(data.id);
              if(employeeRemoved.hasOwnProperty('info')){
              return {info: `${userUpdated.info} e ${employeeRemoved.info}`}
              }
            }
          }
      }

      return userUpdated;
    } else {
      const userUpdated = await this.userRepository.updateWithoutPassword(data);
      if(data.type == 'cliente' && data.situation === 0){
        if(userUpdated.hasOwnProperty('info')){

          const findTicket = await ticketService.findByClient(data.id);

          console.log(findTicket)
          if(findTicket.length > 0){
            const ticketClosed = await this.closeTicket(data.id);
            if(ticketClosed.hasOwnProperty('info')){
            return {info: `${userUpdated.info}`}
            }
          }
        }
      }
      if((data.type == 'suporte' || data.type == 'admin') && data.situation === 0){
        if(userUpdated.hasOwnProperty('info')){
        
          const findTicket = await ticketService.findByEmployee(data.id);

          if(findTicket.length > 0){
            const employeeRemoved = await ticketService.removeInactiveEmployeeTicket(data.id);
            if(employeeRemoved.hasOwnProperty('info')){
            return {info: `${userUpdated.info}`}
            }
          }
        }
    }
      return userUpdated;
    }
    
  }

  async create(data){
    const userValidation = new UserValidation();
    userValidation.createValidation(data);
    
    if(!userValidation){
      throw new Error('Dado inválido');
    }

    const userValidate = await this.checkUserExistence(data.email, data.name, 'create');

    if(!userValidate){
      throw new Error('O email ou nome(username) já está em uso');
    }

    data.password = bcrypt.hashSync(data.password);

    const userCreated = await this.userRepository.create(data);
    return userCreated;
  }

  async findAll(data){
    console.log(data.type)
    const userValidation = new UserValidation();
    const typeValidate = userValidation.checkType(data.type);

    if(!typeValidate){
      throw new Error('Tipo de usuário inválido');
    }
   
    const all = await this.userRepository.findAll(data.type);
    return all;
  }

  async findById(id){

    const userValidation = new UserValidation();
    const idValidate = userValidation.checkId(id);
    console.log("veio3")
    if(!idValidate){
      throw new Error('Código de usuário inválido');
    }
   
    const userFound = await this.userRepository.findById(id);
    return userFound;
  }
}

module.exports = UserService;