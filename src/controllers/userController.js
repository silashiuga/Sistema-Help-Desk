const jwt = require('jsonwebtoken');
const UserService = require('../services/userService.js');

class UserController {

  async login(req, res){
    const {body} = req;
    console.log("veio")
    try{
      const userService = new UserService();
      console.log(body)
      const result = await userService.login(body);

      const id = result[0].codigo;
      const userType = result[0].tipo;

      const token = jwt.sign({id:id, type: userType}, process.env.TOKEN_SECRET);
      result[0].authorization = token;
      console.log(result)
      return res.json(result);

    } catch(error){
      return res.status(400).json({
        error: error.message
      })
    }
  }

  async findAll(req, res){
 
    try {
      const userService = new UserService();
      const result = await userService.findAll(req.query);

      return res.json(result);
    } catch(error){
      return res.status(400).json({
                error: error.message
             })
    }
  }

  async findById(req, res){

    try {
      console.log(req.query)
      const userService = new UserService();
      const result = await userService.findById(req.query.id);

      return res.json(result);
    } catch(error){
      return res.status(400).json({
                error: error.message
             })
    }
  }

  async create(req, res){
    const {body} = req;

    try {
      const userService = new UserService();
      const result = await userService.create(body);

      return res.json(result);
    } catch(error){
      return res.status(400).json({
                error: error.message
             })
    }
  }

  async delete(req, res){
    const {body} = req;
    try {
      console.log(req.query)
      const userService = new UserService();
      const result = await userService.delete(body);

      return res.json(result);
    } catch(error){
      return res.status(400).json({
                error: error.message
             })
    }
  }

  async update(req, res){
    const {body} = req;

    try {
      const userService = new UserService();
      const result = await userService.update(body);

      return res.json(result);
    } catch(error){
      return res.status(400).json({
                error: error.message
             })
    }
  }

}

module.exports = UserController;