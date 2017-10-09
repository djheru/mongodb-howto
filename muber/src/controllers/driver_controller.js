const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ ohai: 'lolwut' });
  },
  create(req, res, next) {
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },
  edit(req, res, next) {
    const driverProps = req.body;
    Driver.update({ _id: req.params.id }, driverProps)
      .then(() => {
        return Driver.findById(req.params.id);
      })
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },
  delete(req, res, next) {
    Driver.findByIdAndRemove({ _id: req.params.id })
      .then((driver) => res.status(204).send(driver))
      .catch(next);
  }
};
