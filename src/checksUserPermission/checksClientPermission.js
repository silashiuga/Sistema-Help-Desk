function checksClientPermission(req, res, next){
  if(req.user.type === 'cliente'){
    if(req.originalUrl === '/ticket/create'){
      console.log(req.body.client_id );
      console.log(req.user.id );
      if(req.body.client_id == req.user.id){
        next();
      } else {
       return res.status(401).json({error:'Apenas o Cliente pode criar seu próprio ticket: Acesso Negado'});
      } 
    }
    else if(req.originalUrl === '/ticket/closeTicket'){
      if(req.body.client_id == req.user.id){
        next();
      } else {
       return res.status(401).json({error:'Apenas cliente que criou o ticket e os Funcionários podem fechar este ticket: Acesso Negado'});
      } 
    }
    else {

      next();
    }
  } else {
    res.status(401).json({error:'Apenas Clientes: Acesso Negado'});
  }
}

module.exports = checksClientPermission;