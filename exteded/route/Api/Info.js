module.exports = (app, express, env) => {
  app.get('/api/v1/info', (req, res) => {
    res.json({
      info: {
        temperature: 23.0,
        humidity: 60,
        pressure: 1000,
        cpu_temperature: 63
      },
      versions: {
        device: {
          number: '1.0.0',
          code: 'Magnolia',
          extra: 'Raspbian',
        },
        app: {
          number: '1.0.0',
          code: 'Magnolia',
        },
        live_streaming: {
          number: '1.0.0',
          code: 'Magnolia',
        },
      }
    });
  });
};
