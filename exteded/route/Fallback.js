module.exports = (app, express, env) => {
  app.use(
    express.static(
      env.documentRoot + '/public'
    )
  );
  app.use((req, res) => res.sendFile(
    env.documentRoot + '/public/index.html'
  ));
};
