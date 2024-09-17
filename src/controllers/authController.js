const jwt = require('jsonwebtoken');
const UserService = require('../services/userService.js');

module.exports = async (req, res, next) => {
  const token = req.header('authorization-token');
  if(!token){
    console.log('erro');
    return res.status(401).send('Acesso negado');
  }
  try {
    let userVerified = "";

    userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = userVerified;

    let userService = null;

    userService = new UserService();

    let userFound = null;

    userFound = await userService.findById(userVerified.id);
    console.log(token)
    console.log(userFound)
    if(userFound[0].situacao == 0){

      userFound = null;
      res.status(401).send({error:'Usuário não está ativo'});
    } else {
      userFound = null;
      next();
    }
  } catch(error){
    res.status(401).send({error: error.message});
  }
}