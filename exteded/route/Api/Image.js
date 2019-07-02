module.exports = (app, express, env) => {
  app.get('/api/v1/image', (req, res) => {
    res.json([
      {
        src: '/img/iris.jpg',
      },
      {
        src: '/img/iris.jpg',
      },
      {
        src: '/img/iris.jpg',
      },
      {
        src: '/img/iris.jpg',
      },
      {
        src: '/img/iris.jpg',
      },
      {
        src: '/img/iris.jpg',
      },
      {
        src: '/img/iris.jpg',
      },
      {
        src: '/img/iris.jpg',
      },
    ]);
  });
};
