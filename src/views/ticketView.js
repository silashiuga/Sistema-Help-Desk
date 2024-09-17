export class TicketView {

  captureValueFilter(ticketModel){
    const filterCategory = document.getElementById('listCategory').value;
    const filterDate = document.getElementById('filter-date').value;
    const filterStatus = document.getElementById('filter-status').value;
    const filterSeverity = document.getElementById('filter-severity').value;

    ticketModel.setFilterCategory(filterCategory)
    ticketModel.setFilterDate(filterDate)
    ticketModel.setFilterStatus(filterStatus)
    ticketModel.setFilterSeverity(filterSeverity)
  }

  getInputValue(ticketModel){
    const form = document.forms.createTicket.elements
    console.log(form[1].value)
    ticketModel.setInputValue(form);

    form[0].value = '';
    form[1].value = 0;
    form[2].value = '';
    form[3].selectedIndex = 0;
  }


  ticketTable(list, userType){
    let sectionTable;
    let id = '';

    sectionTable = document.getElementById('table-container');
     
     if(sectionTable.childNodes.length > 0){
       let tableRemoved = sectionTable.childNodes[0];
       tableRemoved.parentNode.removeChild(tableRemoved);
       tableRemoved = null;
     }
     id = "ticketFound";

     const table = `
     <table id="${id}"> 
       <thead>
         <tr>
           <th>Código</th>
           <th>Cliente</th>
           <th>Título</th>
           <th>Categoria</th>
           <th>Data criação</th>
           <th>Status</th>
           <th>Gravidade</th>
           <th>Editar</th>
         </tr>
       </thead>
       <tbody>
         ${list.map((ticket) => {
          if(userType === 'admin'){
            return `
              <tr> 
                <td>${ticket.codigo}</td>
                <td>${ticket.cliente}</td>
                <td>${ticket.titulo}</td>
                <td>${ticket.categoria}</td>
                <td>${ticket.data_criacao.substring(0,10)}</td>
                <td>${ticket.estado}</td>
                <td>${ticket.gravidade}</td>
                <td><a class="ticketEdit" href="./adminTicketPanel.html?codigo=${ticket.codigo}"><img src="../../assets/icons/edit.svg"></a></td>
              </tr>
            `
          } else if(userType === 'suporte'){
            return `
              <tr> 
                <td>${ticket.codigo}</td>
                <td>${ticket.cliente}</td>
                <td>${ticket.titulo}</td>
                <td>${ticket.categoria}</td>
                <td>${ticket.data_criacao.substring(0,10)}</td>
                <td>${ticket.estado}</td>
                <td>${ticket.gravidade}</td>
                <td><a class="ticketEdit" href="./supportTicketPanel.html?codigo=${ticket.codigo}"><img src="../../assets/icons/edit.svg"></a></td>
              </tr>
            `
          } else if(userType === 'cliente'){
            console.log('foi')
            return `
              <tr> 
                <td>${ticket.codigo}</td>
                <td>${ticket.cliente}</td>
                <td>${ticket.titulo}</td>
                <td>${ticket.categoria}</td>
                <td>${ticket.data_criacao.substring(0,10)}</td>
                <td>${ticket.estado}</td>
                <td>${ticket.gravidade}</td>
                <td><a class="ticketEdit" href="./clientTicketPanel.html?codigo=${ticket.codigo}"><img src="../../assets/icons/edit.svg"></a></td>
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
}