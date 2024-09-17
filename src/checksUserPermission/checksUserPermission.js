function checksUserPermission(req, res, next){
  console.log(req.user.type)
  if(req.user.type === 'suporte' || req.user.type === 'admin' || req.user.type === 'cliente'){
    if(req.user.type === 'cliente'){
      console.log('req')
      if(req.baseUrl === '/ticket' && req.route.path === '/findByCLient'){
        if(req.query.id == req.user.id){
          next();
        } else {
          return res.status(401).json({error:'Acesso Negado'});
        }
      } else {
        next()
      }
    } else {
      next();
    }
  } else {
    return res.status(401).json({error:'Acesso Negado'});
  }
}

module.exports = checksUserPermission;
