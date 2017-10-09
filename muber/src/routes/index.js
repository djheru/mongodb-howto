const driverController = require('../controllers/driver_controller');

module.exports = (app) => {
  app.get('/api', driverController.greeting);
  app.post('/api/drivers', driverController.create);
  app.put('/api/drivers/:id', driverController.edit);
  app.delete('/api/drivers/:id', driverController.delete);
};
