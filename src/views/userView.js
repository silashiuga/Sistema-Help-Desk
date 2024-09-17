
export class UserView{

  inputLogin(userModel){
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    userModel.setLogin(email, password);
  }

  displayCLientList(userModel, userType = ''){

    let sectionTable;
    let id = '';

    sectionTable = document.getElementById('table-container');

    if(sectionTable.childNodes.length > 0){
      let tableRemoved = sectionTable.childNodes[0];
      tableRemoved.parentNode.removeChild(tableRemoved);
      tableRemoved = null;
    }
    id = "userFound";

    const list = userModel.getUserList();

    const table = `
    <table id='${id}'> 
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>   
          <th>Situação</th>   
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        ${list.map((user) => {
          // Na edição de cliente, tanto o admin quanto o suporte 
          // terão formularios diferentes
       
          if(userType === 'admin'){
            
            if(user.situacao === 1){
              return `
                <tr> 
                  <td>${user.codigo}</td>
                  <td>${user.nome}</td>
                  <td>${user.email}</td>
                  <td>${user.telefone}</td>
                  <td>Ativo</td>
                  <td><a href="./userFormHandledByAdmin.html?codigo=${user.codigo}&action=edit&user=cliente" ><img src="../../assets/icons/edit.svg"></a></td>
                </tr>
                `
            } else {
              return `
                <tr> 
                  <td>${user.codigo}</td>
                  <td>${user.nome}</td>
                  <td>${user.email}</td>
                  <td>${user.telefone}</td>
                  <td>Inativo</td>
                  <td><a href="./userFormHandledByAdmin.html?codigo=${user.codigo}&action=edit&user=cliente" ><img src="../../assets/icons/edit.svg"></a></td>
                </tr>
                `
            }
          }if(userType === 'suporte'){
            if(user.situacao === 1){
              return `
                <tr> 
                  <td>${user.codigo}</td>
                  <td>${user.nome}</td>
                  <td>${user.email}</td>
                  <td>${user.telefone}</td>
                  <td>Ativo</td>
                  <td><a href="./userFormHandledBySupport.html?codigo=${user.codigo}&action=edit&user=cliente" ><img src="../../assets/icons/edit.svg"></a></td>
                </tr>
                `
            } else {
              return `
                <tr> 
                  <td>${user.codigo}</td>
                  <td>${user.nome}</td>
                  <td>${user.email}</td>
                  <td>${user.telefone}</td>
                  <td>Inativo</td>
                  <td><a href="./userFormHandledBySupport.html?codigo=${user.codigo}&action=edit&user=cliente" ><img src="../../assets/icons/edit.svg"></a></td>
                </tr>
                `
            }
          }
          
        }).join('')}
      </tbody>
    </table> `;

    let doc = new DOMParser().parseFromString(table, "text/html");
    sectionTable.appendChild(doc.getElementById(id));

    doc = null;
    sectionTable = null;
  }

  displaySupportList(userModel){

    let sectionTable;
    let id = '';

    sectionTable = document.getElementById('table-container');

    if(sectionTable.childNodes.length > 0){
      let tableRemoved = sectionTable.childNodes[0];
      tableRemoved.parentNode.removeChild(tableRemoved);
      tableRemoved = null;
    }
    id = "userFound";

    const list = userModel.getUserList();

    const table = `
    <table id='${id}'> 
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>   
          <th>Situação</th>   
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        ${list.map((user) => {

            if(user.situacao === 1){
              return `
                <tr> 
                  <td>${user.codigo}</td>
                  <td>${user.nome}</td>
                  <td>${user.email}</td>
                  <td>${user.telefone}</td>
                  <td>Ativo</td>
                  <td><a href="./userFormHandledByAdmin.html?codigo=${user.codigo}&action=edit&user=suporte" ><img src="../../assets/icons/edit.svg"></a></td>
                </tr>
                `
            } else {
              return `
                <tr> 
                  <td>${user.codigo}</td>
                  <td>${user.nome}</td>
                  <td>${user.email}</td>
                  <td>${user.telefone}</td>
                  <td>Inativo</td>
                  <td><a href="./userFormHandledByAdmin.html?codigo=${user.codigo}&action=edit&user=suporte" ><img src="../../assets/icons/edit.svg"></a></td>
                </tr>
                `
            }     
          
        }).join('')}
      </tbody>
    </table> `;

    let doc = new DOMParser().parseFromString(table, "text/html");
    sectionTable.appendChild(doc.getElementById(id));

    doc = null;
    sectionTable = null;
  }

  displayAdminList(userModel){

    let sectionTable;
    let id = '';

    sectionTable = document.getElementById('table-container');

    if(sectionTable.childNodes.length > 0){
      let tableRemoved = sectionTable.childNodes[0];
      tableRemoved.parentNode.removeChild(tableRemoved);
      tableRemoved = null;
    }
    id = "userFound";

    const list = userModel.getUserList();

    const table = `
    <table id='${id}'> 
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>   
          <th>Situação</th>   
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        ${list.map((user) => {

            if(user.situacao === 1){
              return `
                <tr> 
                  <td>${user.codigo}</td>
                  <td>${user.nome}</td>
                  <td>${user.email}</td>
                  <td>${user.telefone}</td>
                  <td>Ativo</td>
                  <td><a href="./userFormHandledByAdmin.html?codigo=${user.codigo}&action=edit&user=admin" ><img src="../../assets/icons/edit.svg"></a></td>
                </tr>
                `
            } else {
              return `
                <tr> 
                  <td>${user.codigo}</td>
                  <td>${user.nome}</td>
                  <td>${user.email}</td>
                  <td>${user.telefone}</td>
                  <td>Inativo</td>
                  <td><a href="./userFormHandledByAdmin.html?codigo=${user.codigo}&action=edit&user=admin" ><img src="../../assets/icons/edit.svg"></a></td>
                </tr>
                `
            }     
          
        }).join('')}
      </tbody>
    </table> `;

    let doc = new DOMParser().parseFromString(table, "text/html");
    sectionTable.appendChild(doc.getElementById(id));

    doc = null;
    sectionTable = null;
  }
}