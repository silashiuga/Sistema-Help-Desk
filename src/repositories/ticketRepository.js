class TicketRepository {

  con = require('../../connection.js');

  async create(data){
    const {client_id, date_created, title, description, severity_id, status_id, category_id} = data;
    const query = `INSERT INTO tickets
                              (titulo, descricao, estado_codigo, data_criacao, data_termino, cliente_codigo, suporte_codigo, gravidade_codigo, categoria_codigo) 
                              VALUES ('${title}', '${description}', ${status_id}, '${date_created}', null, ${client_id}, null, ${severity_id}, ${category_id})`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve({info:'Criado com sucesso'});
        })
    })
  }

  async sendMessage(data){
    const {user_id, date_created, content, ticket_id} = data;
    const query = `INSERT INTO mensagens
                                (ticket_codigo, usuario_codigo, conteudo, data_criacao)
                                 VALUES (${ticket_id}, ${user_id}, '${content}', '${date_created}')`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve({info:'Criado com sucesso'});
        })
    })
  }

  async changeTicketStatus(data, date_finish){
    const {status_id, ticket_id} = data
    const query = `UPDATE tickets SET 
                          estado_codigo = ${status_id},
                          data_termino = ${ date_finish ? `'${date_finish}'`: date_finish}
                          WHERE codigo = ${ticket_id}`;
    return new Promise((resolve,reject) =>{
    this.con.query(query, (error) => {

      if(error){
        return reject(new Error (error));
      }
      
      return resolve({info:'Alterado com sucesso'});
      })
    })
  }

  async changeTicketSeverity(data){
    const {severity_id, ticket_id} = data
    const query = `UPDATE tickets SET 
                          gravidade_codigo = ${severity_id}
                          WHERE codigo = ${ticket_id}`;
    return new Promise((resolve,reject) =>{
    this.con.query(query, (error) => {

      if(error){
        return reject(new Error (error));
      }
      
      return resolve({info:'Alterado com sucesso'});
      })
    })
  }

  async closeTicket(data, userInactive){
    const {date_finish, id} = data

    let query ="";
 
    if(userInactive){
      query = `UPDATE tickets SET
                            estado_codigo = ${4},
                            data_termino = '${date_finish}'
                            WHERE cliente_codigo = ${id}
                            AND estado_codigo NOT IN (3,4)`;
                        
    } else {
      query = `UPDATE tickets SET 
                            estado_codigo = ${4},
                            data_termino = '${ date_finish}'
                            WHERE codigo = ${id}`;
    }
    return new Promise((resolve,reject) =>{
    this.con.query(query, (error) => {

      if(error){
        return reject(new Error (error));
      }
      
      return resolve({info:'Ticket fechado'});
      })
    })
  }

  async removeEmployeeTicket(id, userInactive){
    let query;

    if(userInactive){
      query = `UPDATE tickets SET 
                      suporte_codigo = ${null}
                      WHERE suporte_codigo = ${id}
                      AND estado_codigo NOT IN (3,4)`;
    }
     else {
       query = `UPDATE tickets SET 
                              suporte_codigo = ${null}
                              WHERE codigo = ${id}`;
     }
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve({info:'Usuário retirado'});
        })
    })
  }

  async addEmployeeTicket(data){
    const {ticket_id, support_id} = data
    const query = `UPDATE tickets SET 
                            suporte_codigo = ${support_id}
                            WHERE codigo = ${ticket_id}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve({info:'Usuário adicionado'});
        })
    })
  }

  async findById(id){
    const query = `SELECT t.codigo, t.titulo, t.descricao, e.nome AS estado, t.data_criacao, t.data_termino, cli.nome AS cliente,
	                        su.nome AS suporte, g.nome AS gravidade, c.nome AS categoria, t.suporte_codigo, t.cliente_codigo, t.estado_codigo, t.gravidade_codigo  FROM tickets AS t 
                                      LEFT JOIN categorias AS c ON t.categoria_codigo = c.codigo
                                      LEFT JOIN estados AS e ON t.estado_codigo = e.codigo
                                      LEFT JOIN gravidades AS g ON t.gravidade_codigo = g.codigo
                                      LEFT JOIN usuarios AS cli ON t.cliente_codigo = cli.codigo
                                      LEFT JOIN usuarios AS su ON t.suporte_codigo = su.codigo
                                                WHERE t.codigo = ${id}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
    })
  }

  async list(data){
    const {category_id, orderCreate, severity_id, status_id} = data;
    let query = `SELECT t.codigo, t.titulo, t.descricao, e.nome AS estado, t.data_criacao, t.data_termino, cli.nome AS cliente,
	                        su.nome AS suporte, g.nome AS gravidade, c.nome AS categoria, t.suporte_codigo FROM tickets AS t 
                                      LEFT JOIN categorias AS c ON t.categoria_codigo = c.codigo
                                      LEFT JOIN estados AS e ON t.estado_codigo = e.codigo
                                      LEFT JOIN gravidades AS g ON t.gravidade_codigo = g.codigo
                                      LEFT JOIN usuarios AS cli ON t.cliente_codigo = cli.codigo
                                      LEFT JOIN usuarios AS su ON t.suporte_codigo = su.codigo
                                                WHERE 1 = 1`;

    if(category_id != 0){
      query += ` AND t.categoria_codigo = ${category_id}`;
    }

    if(severity_id != 0){
      query += ` AND t.gravidade_codigo = ${severity_id}`;
    }

    if(status_id != 0){
      query += ` AND t.estado_codigo = ${status_id}`;
    }

    query += ` ORDER BY data_criacao ${orderCreate}`;
    console.log(query)
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
    })
  }

  async findByClient(id){
    const query = `SELECT t.codigo, t.titulo, t.descricao, e.nome AS estado, t.data_criacao, t.data_termino, cli.nome AS cliente,
	                        su.nome AS suporte, g.nome AS gravidade, c.nome AS categoria FROM tickets AS t 
                                      LEFT JOIN categorias AS c ON t.categoria_codigo = c.codigo
                                      LEFT JOIN estados AS e ON t.estado_codigo = e.codigo
                                      LEFT JOIN gravidades AS g ON t.gravidade_codigo = g.codigo
                                      LEFT JOIN usuarios AS cli ON t.cliente_codigo = cli.codigo
                                      LEFT JOIN usuarios AS su ON t.suporte_codigo = su.codigo
                                                WHERE cli.codigo = ${id}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
    })
  }

  async findByEmployee(id){
    const query = `SELECT t.codigo, t.titulo, t.descricao, e.nome AS estado, t.data_criacao, t.data_termino, cli.nome AS cliente,
	                        su.nome AS suporte, g.nome AS gravidade, c.nome AS categoria FROM tickets AS t 
                                      LEFT JOIN categorias AS c ON t.categoria_codigo = c.codigo
                                      LEFT JOIN estados AS e ON t.estado_codigo = e.codigo
                                      LEFT JOIN gravidades AS g ON t.gravidade_codigo = g.codigo
                                      LEFT JOIN usuarios AS cli ON t.cliente_codigo = cli.codigo
                                      LEFT JOIN usuarios AS su ON t.suporte_codigo = su.codigo
                                                WHERE su.codigo = ${id}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
    })
  }

  async findEmployeeByMessage(id){
    const query = `SELECT * FROM mensagens WHERE usuario_codigo = ${id}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
    })
  }

  async findByCategory(id){
    const query = `SELECT * FROM tickets WHERE categoria_codigo = ${id}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
    })
  }

  async listMessage(id){
    const query = `SELECT us.nome, ms.data_criacao, us.tipo, ms.conteudo FROM mensagens AS ms 
                        INNER JOIN usuarios AS us 
                                ON ms.usuario_codigo = us.codigo 
                                WHERE ticket_codigo = ${id} 
                                ORDER BY ms.data_criacao`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
    })
  }
}

module.exports = TicketRepository;