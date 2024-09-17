const CategoryRepository = require('../repositories/categoryRepository.js');
const CategoryValidation = require('../validations/categoryValidation.js');
const TicketService = require('./ticketService.js');

class CategoryService {
  constructor(){
    this.categoryRepository = new CategoryRepository();
  }

  categoryRepository;

  async checkCategoryExistence(name, action, id=0){
    if(action === 'create'){
      const nameExist = await this.categoryRepository.findByName(name);
      if(nameExist.length > 0){
        return false;
      } else{
        return true;
      }
 
    } else if (action === 'update') {
      const nameExist = await this.categoryRepository.findByName(name);
  
      if(nameExist.length > 0){
        if(nameExist[0].codigo == id){
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }

  }

  async create(data){
    const categoryValidation = new CategoryValidation();
    const validateData = categoryValidation.createValidation(data);

    if(!validateData){
      throw new Error('Dado inválido');
    }

    const nameExist = await this.checkCategoryExistence(data.name, 'create');

    if(!nameExist){
      throw new Error('O nome já está em uso');
    }

    const categoryCreated = await this.categoryRepository.create(data);
    return categoryCreated;
  }

  async update(data){
    const categoryValidation = new CategoryValidation();
    const validateData = categoryValidation.updateValidation(data);

    if(!validateData){
      throw new Error('Dado inválido');
    }
    console.log(data.id)
    const nameExist = await this.checkCategoryExistence(data.name, 'update', data.id);

    if(!nameExist){
      throw new Error('O nome já está em uso');
    }

    const categoryUpdate = await this.categoryRepository.update(data);
    return categoryUpdate;
  }

  async delete(data){
    const categoryValidation = new CategoryValidation();
    const validateData = categoryValidation.checkId(data.category_id);

    if(!validateData){
      throw new Error('Dado inválido');
    }

    const categoryFound = await this.categoryRepository.findById(data.category_id);
    if(categoryFound.length == 0){
      throw new Error('Categoria não encontrada');
    }

    const ticketService = new TicketService();
    const categoryInTicket = await ticketService.findByCategory(data.category_id);
    if(categoryInTicket.length > 0){
      throw new Error('Não pode deletar categoria por estar em registro de ticket');
    }

    const categoryDelete = await this.categoryRepository.delete(data.category_id);
    return categoryDelete;
  }


  async findById(id){
    const categoryValidation = new CategoryValidation();
    const validateData = categoryValidation.checkId(id);

    if(!validateData){
      throw new Error('Dado inválido');
    }

    const category = await this.categoryRepository.findById(id);
    return category;
  }

  async findBySituation(data){
    data.situation = +data.situation;
    if(data.situation == 2){
      const category = await this.categoryRepository.findAll();
      return category;
    } else {
      const category = await this.categoryRepository.findBySituation(data.situation);
      return category;
    }
  }
}

module.exports = CategoryService;