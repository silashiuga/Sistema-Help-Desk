const TicketService = require('../services/ticketService.js');

class TicketController {
  async create(req, res){
    const {body} = req;

    try{
      const ticketService = new TicketService();
      const result = await ticketService.create(body);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }

  async update(req, res){
    const {body} = req;

    try{
      const ticketService = new TicketService();
      const result = await ticketService.update(body);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }

  async employeeTicket(req, res){
    const {body} = req;
    const userId = req.user.id;
    console.log(userId)
    try{
      const ticketService = new TicketService();
      const result = await ticketService.employeeTicket(body, userId);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }

  async changeTicketStatus(req, res){
    const {body} = req;
    const userId = req.user.id;
    try{
      const ticketService = new TicketService();
      const result = await ticketService.changeTicketStatus(body, userId);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }

  async changeTicketSeverity(req, res){
    const {body} = req;
    const userId = req.user.id;
    try{
      const ticketService = new TicketService();
      const result = await ticketService.changeTicketSeverity(body, userId);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }

  async closeTicket(req, res){
    const {body} = req;
    try{
      const ticketService = new TicketService();
      const result = await ticketService.closeTicket(body);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }

  async findById(req, res){

    try{

      const ticketService = new TicketService();
      const result = await ticketService.findById(req.query.id, req.user.id, req.user.type);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }

  async list(req, res){

    try{
      const ticketService = new TicketService();
      const result = await ticketService.list(req.query);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }

  async findByClient(req, res){

    try{
      const ticketService = new TicketService();
      const result = await ticketService.findByClient(req.query.id);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }

  async createMessage(req, res){
    const {body} = req;
    const userId = req.user.id;

    try{
      const ticketService = new TicketService();
      const result = await ticketService.createMessage(body, userId);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }

  async listMessage(req, res){

    try{
      console.log(req.user)
      const ticketService = new TicketService();
      const result = await ticketService.listMessage(req.query.ticket_id, req.user.id, req.user.type);

      return res.json(result);
    } catch(error){
        return res.status(400).json({
               error: error.message
               })
    }
  }
}

module.exports = TicketController;