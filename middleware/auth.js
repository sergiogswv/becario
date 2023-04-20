const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
  const token = req.header('Authorization')

  if(!token){
    return res.status(400).json({msg: 'El token ya no es valido'})
  }

  try {
    const cifrado = jwt.verify(token, process.env.CRYPTWORD)
    req.usuario = cifrado.usuario
    next()
  } catch (error) {
    res.status(400).json({ msg: 'El token no es válido'})
  }
}