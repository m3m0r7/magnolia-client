module.exports = (app, express, env) => {
  app.get('/api/v1/image', (req, res) => {
    res.json({
      '2019/12': [
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
      ]
    });
  });
};
