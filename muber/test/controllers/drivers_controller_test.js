const assert = require('assert');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

const Driver = mongoose.model('Driver');

describe('drivers controller', () => {
  it('POST to /api/drivers creates a new driver', (done) => {
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

  it('PUT to /api/drivers/:id updates a driver', (done) => {
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

  it('DELETE to /api/drivers/:id deletes a driver', (done) => {
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

  it('GET to /api/drivers finds drivers near a location', (done) => {
    const driver1 = new Driver({
      email: 'a@a.com',
      geometry: {
        type: 'Point',
        coordinates: [ -122.476, 47.615 ] // Seattle
      }
    });

    const driver2 = new Driver({
      email: 'z@z.com',
      geometry: {
        type: 'Point',
        coordinates: [ -80.253, 25.791 ] // Miami
      }
    });
    Promise.all([ driver1.save(), driver2.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80.2&lat=25.8')
          .end((err, response) => {
            /*
              // returns a response like:
              const results = [
                {
                  dis: 5405.644610122851,
                  obj:
                    {
                      email: 'z@z.com',
                      geometry: {
                        coordinates: [ -80.253, 25.791 ],
                        _id: '59daf2106d6641445ed67f81',
                        type: 'Point'
                      },
                      __v: 0,
                      _id: '59daf15b2eb44943b61a0823',
                      isDriving: false
                    }
                }
              ];
             */
            assert(response.body.length === 1);
            assert(response.body[0].obj.email === 'z@z.com');
            done();
          });
      })
  });
});
