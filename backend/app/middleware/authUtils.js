export const isConnected = (req, res, next) => {
    console.log('SESSION REDIS', req.session);
    if (req.session && req.session.user && req.session.user.id) {
        return next();
      } else {
        return res.status(401).json({ msg: "pas autorisé" });
      }
    }
    
// Vérifier si l'utilisateur est admin
export const isAdmin = (req, res, next) => {
    // Vérifier qu'il est admin
    if (!req.session.user.isAdmin) {
      return res.status(401).json("Tu n'as pas les accès à cette page !"); 
    }
    // Sinon, il est bien connecté et admin
    next();
}