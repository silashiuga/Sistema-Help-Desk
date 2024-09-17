function checksEmployeerPermission(req, res, next){

  if(req.user.type === 'admin' || req.user.type === 'suporte'){

    // Requisição feita pelo suporte
    if(req.user.type === 'suporte'){

      // Criação de usuário cliente
      if(req.originalUrl === '/user/create'){
       if(req.body.type == 'cliente'){
         next();
       } else {
        return res.status(401).json({error:'Apenas Administradores podem criar este tipo de conta: Acesso Negado'});
       } 
       // Remoção de usuário cliente
      } else if(req.originalUrl === '/user/delete'){
        if(req.body.type == 'cliente'){
          next();
        } else {
         return res.status(401).json({error:'Apenas Administradores podem deletar este tipo de conta: Acesso Negado'});
        } 
      // Lista de usuário cliente
      } else if(req.baseUrl === '/user' && req.route.path === '/findAll'){
        console.log('veio1')
        if(req.query.type == 'cliente'){
          next();
        } else {
         return res.status(401).json({error:'Apenas administradores podem acessar: Acesso Negado'});
        } 
      // Procurar por cliente específico
      } else if(req.baseUrl === '/user' && req.route.path === '/findById'){
        if(req.query.type == 'cliente'){
          next();
        }  else {
         return res.status(401).json({error:'Apenas administradores podem acessar: Acesso Negado'});
        } 
      // Criação de categoria
      } else if(req.originalUrl === '/category/create'){
        next();
      // Remoção de categoria
      } else if(req.originalUrl === '/category/delete'){
        next();
      // Atualização de categoria
      } else if(req.originalUrl === '/category/update'){
        next();
      // Pesquisa de categoria
      } else if(req.baseUrl === '/category' && req.route.path === '/findById'){
        next();
      // Lista de categoria
      } else if(req.baseUrl === '/category' && req.route.path === '/findAll'){
        next();
      // Atualização de ticket
      } else if(req.originalUrl === '/ticket/update'){
        next();
      // Atribuir responsabilidade ao ticket
      } else if(req.originalUrl === '/ticket/employeeTicket'){
        console.log(req.body.suport_id)
        if(req.body.support_id == req.user.id){
          next();
        }else {
          return res.status(401).json({error:'Apenas o próprio suporte ou outro admin pode atribuir esta reponsabilidade: Acesso Negado'});
        }
      // Listar ticket
      } else if(req.baseUrl === '/ticket' && req.route.path === '/list'){
        next();
      // Procura ticket pelo código
      }
      //Mudar o status do ticket
      else if(req.originalUrl === '/ticket/changeTicketStatus'){
        next();
      } else {
        next();
      }
      // Requisição feita pelo administrador
    } else {
      next();
    } 
  } else {
    return res.status(401).json({error:'Apenas Funcionários: Acesso Negado'});
  }
}

module.exports = checksEmployeerPermission;