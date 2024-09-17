export class CategoryModel {
  
  categoryList;
  id;
  name;
  situation;

  setInputValue(form){
    this.name = form[0].value;

    if(form[1].checked){
      this.situation = 1;
    } else {
      this.situation = 0;
    }
  }

  setCategoryList(categoryList){
    this.categoryList = categoryList;
  }

  getCategoryList(){
    return this.categoryList;
  }

  getName(){
    return this.name 
  }

  setName(name){
    this.name = name;
  }
  
  getSituation(){
    return this.situation;
  }

  setSituation(situation){
    this.situation = situation;
  }

  getId(){
    return this.id;
  }

  setId(id){
    this.id = id;
  }

}