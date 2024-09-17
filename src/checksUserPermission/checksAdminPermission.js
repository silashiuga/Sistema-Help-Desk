function checksAdminPermission(req, res, next){
  if(req.user.type === 'admin'){
    next();
  } else {
    res.status(401).json({error:'Apenas Administradores: Acesso Negado'});
  }
}

module.exports = checksAdminPermission;