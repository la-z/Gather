module.exports.checkAuthentication = (req, res, next) => {
  // middleware for routes requiring authorization
  if (req.isAuthenticated()) {
    // method exposed on req in passport
    return next();
  }
  return res.send(403);
};

/*
checkAdmin
if req.user does not have role "admin", sends res 401
*/

module.exports.checkAdmin = (req, res, next) => {
  const { user } = req;
  if (user.role !== 'admin') return res.send(401, 'Administrator privileges needed');
  return next();
};
