const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ ohai: 'lolwut' });
  },
  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 /* in meters */}
    )
      .then((drivers) => {
        return res.send(drivers);
      })
      .catch(next);
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
