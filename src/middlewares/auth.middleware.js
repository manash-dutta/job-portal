export const auth = (req, res, next) => {
  if(req.session.userEmail) {
    next()
  } else {
    res.redirect("/login");
  }
}

export const authError = (req, res, next) => {
  if(req.session.userEmail) {
    next()
  } else {
    res.render("error");
  }
}