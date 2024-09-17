function checksUserUpdatePermission (req, res, next){
  if(req.user.type === 'suporte'){
    // Pesquisa por findById para preencher os campos do cliente no formuário
    if(req.query.type){
      if(req.query.type === 'suporte'){
        if(req.query.id == req.user.id){
          next();
        } else {
          return res.status(401).json({error:'Acesso Negado'});
        }
      } else if (req.query.type === 'cliente'){
        next();
      } else {
        return res.status(401).json({error:'Acesso Negado'});
      }
    } 
    // Verificação para o update
    else if(req.body.type === 'suporte'){
      if(req.body.id == req.user.id){
        next();
      } else {
        return res.status(401).json({error:'Acesso Negado'});
      }
    } else if(req.body.type === 'cliente'){
      next();
    } else {
      return res.status(401).json({error:'Acesso Negado'});
    }

  } else if(req.user.type === 'cliente'){
    if(req.query.type){
      if(req.query.type === 'cliente'){
        if(req.query.id == req.user.id){
          next();
        } else {
          return res.status(401).json({error:'Acesso Negado'});
        }
      }
    } else if(req.body.id == req.user.id){
      next();
    } else {
      return res.status(401).json({error:'Acesso Negado'});
    }
  } else if(req.user.type === 'admin'){
    next();
  } else {
    return res.status(401).json({error:'Acesso Negado'});
  }
}

module.exports = checksUserUpdatePermission;