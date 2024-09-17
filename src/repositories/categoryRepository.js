
class CategoryRepository {

  con = require('../../connection.js');

  async create(data){
    const {name, situation} = data;
    const query = `INSERT INTO categorias (nome, situacao) 
                              VALUES ('${name}',${situation})`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve({info:'Criado com sucesso'});
        })
      })
  }

  async update(data){
    const {name, situation, id} = data;
    const query = `UPDATE categorias
                   SET nome = '${name}',
                       situacao = ${situation}
                   WHERE codigo = ${id}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve({info:'Atualizado com sucesso'});
        })
      })
  }

  async findById(id){

    const query = `SELECT * FROM categorias WHERE codigo = ${id}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
      })
  }

  async findAll(){

    const query = 'SELECT * FROM categorias';
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
      })
  }

  async findBySituation(situation){

    const query = `SELECT * FROM categorias WHERE situacao = ${situation}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
      })
  }

  async delete(id){

    const query = `DELETE FROM categorias WHERE codigo = ${id}`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve({info:'Deletado com sucesso'});
        })
      })
  }

  async findForCreateTicket(){

    const query = `SELECT * FROM categorias WHERE situacao = 1`;
    return new Promise((resolve,reject) =>{
      this.con.query(query, (error, result) => {
  
        if(error){
          return reject(new Error (error));
        }
        
        return resolve(result);
        })
      })
  }

  async findByName(name){

    const query = `SELECT * FROM categorias WHERE nome = '${name}'`;
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

module.exports = CategoryRepository;