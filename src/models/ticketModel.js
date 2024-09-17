export class TicketModel {
  filterCategory;
  filterDate;
  filterStatus;
  filterSeverity;

  title;
  category;
  severtity;
  description;
  userType;

  setFilterCategory(filterCategory){
    this.filterCategory = filterCategory;
  }
  getFilterCategory(){
    return this.filterCategory;
  }

  setFilterDate(filterDate){
    this.filterDate = filterDate;
  }
  getFilterDate(){
    return this.filterDate;
  }

  setFilterStatus(filterStatus){
    this.filterStatus = filterStatus;
  }
  getFilterStatus(){
    return this.filterStatus;
  }

  setFilterSeverity(filterSeverity){
   this.filterSeverity = filterSeverity;
  }
  getFilterSeverity(){
    return this.filterSeverity;
  }

  dataValidate(){
    const errorInfo = new Object({
      status:false,
      content:''
    })
    console.log(this.category)
    if (this.category == 0){
      errorInfo.status = true;
      errorInfo.content = 'Selecione uma categoria. ';
    }
    if(!this.title || !this.description || !this.severtity){
      if(!errorInfo.status){
        errorInfo.status = true;
      }
      errorInfo.content += 'É necessário preencher todos os campos.'
    }

    return errorInfo;
    
  }

  objTicketforCreate(clientId){
    const objDate = new Date();
    const date = `${objDate.getFullYear()}-${objDate.getMonth() + 1  < 10? '0'+(objDate.getMonth()+1): objDate.getMonth()+1}-${objDate.getDate() + 1 < 10 ? '0'+objDate.getDate() : objDate.getDate()}`;

    return new Object({
      title:this.title,
      category_id:this.category,
      description:this.description,
      severity_id:this.severtity,
      date_created:date,
      client_id: clientId,
      status_id:1,
    })
  }

  setInputValue(form){
    console.log(form)
    this.title = form[0].value;
    this.category = form[1].value;
    this.description = form[2].value;
    this.severtity = form[3].value;
  }

}