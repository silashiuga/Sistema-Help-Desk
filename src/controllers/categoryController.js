const CategoryService = require('../services/categoryService.js');


class CategoryController {
  async create(req, res){
    const {body} = req;

    try {
      const categoryService = new CategoryService();
      const result = await categoryService.create(body);
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
      const categoryService = new CategoryService();
      const result = await categoryService.update(body);
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
      const categoryService = new CategoryService();
      const result = await categoryService.delete(body);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findById(req, res){

    try {
      const categoryService = new CategoryService();
      const result = await categoryService.findById(req.query.id);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  }

  async findBySituation(req, res){

    try {
      const categoryService = new CategoryService();
      const result = await categoryService.findBySituation(req.query);
      return res.json(result);

    } catch(error){
      return res.status(400).json({
              error: error.message
            })
    }
  }
}

module.exports = CategoryController;