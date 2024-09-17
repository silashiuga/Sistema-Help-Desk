export class CategoryView {

  configureCategory(list){
    const selectList = `
      <select class="filter" id="listCategory" required="required">
      <option value="0">TODOS</option>
      ${ list.map(category => {
        if(category.situacao === 0){
          return `<option value="${category.codigo}"> ${category.nome.toUpperCase()} (INATIVO) </option>`
        }
        return `<option value="${category.codigo}"> ${category.nome.toUpperCase()} </option>`
      })
        
      }
      </select>
    `;
    const categoryList = document.querySelector('#selectCategory'); 
    categoryList.innerHTML += selectList;
  }

  configureCategoryinCreateTicket(list){
    const selectList = `
      <select class="category" id="listCategory" required="required">
      <option value="0">SELECIONE</option>
      ${ list.map(category => {
        if(category.situacao === 0){
          return `<option value="${category.codigo}"> ${category.nome.toUpperCase()} (INATIVO) </option>`
        }
        return `<option value="${category.codigo}"> ${category.nome.toUpperCase()} </option>`
      })
        
      }
      </select>
    `;

    const categoryList = document.querySelector('#selectCategory'); 
    categoryList.innerHTML += selectList;
  }

  categoryTable(categoryModel){
    let sectionTable;
    let id = '';
    let list = categoryModel.getCategoryList();

    sectionTable = document.getElementById('table-container');
     
    if(sectionTable.childNodes.length > 0){
      let tableRemoved = sectionTable.childNodes[0];
      tableRemoved.parentNode.removeChild(tableRemoved);
      tableRemoved = null;
    }

    id = "categoryFound";

    const table = `
      <table id='${id}'> 
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Situação</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          ${list.map((category) => {
            if(category.situacao === 0 ){
              return `
                <tr> 
                  <td>${category.codigo}</td>
                  <td>${category.nome}</td>
                  <td>Inativo</td>
                  <td><div class="btn-edit" data-id='${category.codigo}' data-name='${category.nome}' data-status='${category.situacao}'><img src="../../assets/icons/edit.svg"></div></td>
                </tr>
              `
            } else if(category.situacao === 1){
              return `
                 <tr> 
                  <td>${category.codigo}</td>
                  <td>${category.nome}</td>
                  <td>Ativo</td>
                  <td><div class="btn-edit" data-id='${category.codigo}' data-name='${category.nome}' data-status='${category.situacao}'><img src="../../assets/icons/edit.svg"></div></td>
                </tr>
              `
            } 
          }).join('')}
        </tbody>
      </table>
    `;

    let doc = new DOMParser().parseFromString(table, "text/html");
    sectionTable.appendChild(doc.getElementById(id));

    doc = null;
    sectionTable = null;
  }

  getInputValue(categoryModal){
    const form = document.forms.create.elements;
    categoryModal.setInputValue(form);
  }

  getInputValueUpdate(categoryModal){
    const form = document.forms.update.elements;
    categoryModal.setInputValue(form);
  }

  setInputValue(name, ativo){  

    const form = document.forms.update.elements;
    
    form[0].value = name;    
    
    if(ativo == 1){
      form[1].checked = true;
    }else {
      form[2].checked = true;
    }
  }

  resetModal(form){
  
    if(form[0].value){
      form[0].value = "";
    }
    if(!form[1].checked){
      form[1].checked = true;
    } 
  }
}