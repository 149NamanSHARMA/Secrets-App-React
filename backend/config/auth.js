module.exports = {
    ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.status(401).json({ errors: [{ msg: 'Please log in to view this resource' }] });
    }
  };
  