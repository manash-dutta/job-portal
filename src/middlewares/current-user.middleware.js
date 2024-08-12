export const setUserLocals = (req, res, next) => {
  res.locals.userName = req.session.userName || null;
  res.locals.userEmail = req.session.userEmail || null;
  next();
};