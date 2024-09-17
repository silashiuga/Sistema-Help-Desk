class TicketValidation {

  createValidation(data){
    const {client_id, date_created, title, description, severity_id, status_id, category_id} = data;
    const validClientId = this.checkId(client_id);
    const validDateCreated = this.checkDateCreate(date_created);
    const validTitle = this.checkTitle(title);
    const validDescription = this.checkDescription(description);
    const validSeverity = this.checkId(severity_id);
    const validStatus = this.checkId(status_id);
    const validCategory = this.checkId(category_id);

    if(validClientId && validDateCreated && validTitle && validDescription && validSeverity && validStatus && validCategory){
      return true;
    }
    return false;
  }

  updateValidation(data){
    const {status_id, severity_id} = data;
    const validSeverity = this.checkId(severity_id);
    const validStatus = this.checkId(status_id);

    if(validSeverity && validStatus){
      return true;
    }
    return false;
  }

  checkId(id){
    if(!id){
      return false;
    }
    return true;
  }

  checkFilter(value){
    if(value === null || value === undefined){
      return false;
    } else {
      return true;
    }
  }
  
  checkOrderCreate(value){
    if(value === 'DESC' || value === 'ASC'){
      return true;
    }
    return false;
  }

  checkTitle(title){
    if(!title){
      return false;
    }
    if(title.length > 50){
      return false;
    }

    return true;
  }

  checkDescription(description){
    if(!description){
      return false;
    }
    if(description.length > 70){
      return false;
    }

    return true;
  }

  checkDateCreate(date){
    if(!date){
      return false;
    }
    return true;
  }
}

module.exports = TicketValidation;