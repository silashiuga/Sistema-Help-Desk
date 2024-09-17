
class UserRepository {

  con = require('../../connection.js');

  async findByEmail(email){
    const query = `SELECT * FROM usuarios WHERE email = '${email}'`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
 
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }

  async findUserByName(name){
    const query = `SELECT * FROM usuarios WHERE nome = '${name}'`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
 
        if(error){
          return reject(new Error ('Erro ao consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }

  async findAll(type){
    const query = `SELECT * FROM usuarios WHERE tipo = '${type}'`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
 
        if(error){
          return reject(new Error ('Error na consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }

  async findById(id){
    const query = `SELECT * FROM usuarios WHERE codigo = '${id}'`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
 
        if(error){
          return reject(new Error ('Error na consultar o banco de dados'));
        }
        
        return resolve(result);
      })
    })
  }

  async delete(id){
    const query = `DELETE FROM usuarios WHERE codigo = ${id}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
 
        if(error){
          return reject(new Error ('Error na consultar o banco de dados'));
        }
        
        return resolve({info: 'Deletado com sucesso'});
      })
    })
  }

  async create(user){
    const {name, email, phone, password, situation, type} = user;

    const query = `INSERT INTO usuarios (nome, email, senha, telefone, situacao, tipo) 
                              VALUES ('${name}', '${email}', '${password}', '${phone}', ${situation}, '${type}')`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve({info:'Criado com sucesso'});
        })
      })
  }

  async update(user){
    const {id, name, email, phone, password, situation, type} = user;

    const query = `UPDATE usuarios
                   SET nome = '${name}',
                       email = '${email}',
                       telefone = '${phone}',
                       senha = '${password}',
                       situacao = ${situation},
                       tipo = '${type}'
                   WHERE codigo = ${id}`;
    return new Promise((resolve,reject) =>{
    this.con.query(query, (error) => {

      if(error){
        return reject(new Error (error));
      }
      
      return resolve({info:'Alterado com sucesso'});
      })
    })
  }

  async checkAdminActive(){
   
    const query = "SELECT * FROM usuarios WHERE tipo = 'admin' AND situacao = 1";
    return new Promise((resolve,reject) =>{
    this.con.query(query, (error, result) => {

      if(error){
        return reject(new Error (error));
      }
      
      return resolve(result);
      })
    })
  }

  async updateWithoutPassword(user){
    const {id, name, email, phone, situation, type} = user;

    const query = `UPDATE usuarios
                   SET nome = '${name}',
                       email = '${email}',
                       telefone = '${phone}',
                       situacao = ${situation},
                       tipo = '${type}'
                   WHERE codigo = ${id}`;
    return new Promise((resolve,reject) =>{
    this.con.query(query, (error) => {

      if(error){
        return reject(new Error (error));
      }
      
      return resolve({info:'Alterado com sucesso'});
      })
    })
  }
}

module.exports = UserRepository;