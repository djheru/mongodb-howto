const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const Driver = mongoose.model('Driver');

describe('drivers controller', () => {
  it('POST to /api/drivers creates a new dirver', (done) => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.count()
            .then(newCount => {
              assert(count + 1 === newCount);
              done();
            })
            .catch((e) => done(e));
        });
    });
  });

  it('PUT to /api/driver/:id updates a driver', (done) => {
    const driver = new Driver({ email: 't@t.com', isDriving: false });
    driver.save()
      .then(() => {
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({ isDriving: true })
          .end((e, res) => {
            Driver.findOne({ email: 't@t.com' })
              .then(driver => {
                assert(driver.isDriving === true );
                done();
              })
              .catch(e => {
                done(e);
              });
          });
      });
  });

  it('DELETE to /api/driver/:id deletes a driver', (done) => {
    const driver = new Driver({ email: 't@t.com', isDriving: false });
    driver.save()
      .then(() => {
        request(app)
          .del(`/api/drivers/${driver._id}`)
          .end(() => {
            Driver.findOne({ email: 't@t.com' })
              .then(driver => {
                assert(driver === null);
                done();
              })
            .catch(e => {
              done(e);
            });
          });
      });
  });
});
