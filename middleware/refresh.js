const ref = app.use((req, res, next) => {
    res.refresh = () => {
      res.redirect(req.originalUrl);
    };
    next();
  });

module.exports = ref;