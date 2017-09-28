const assert = require('assert');
const User = require('../src/user');

describe('validation', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    assert(validationResult.errors.name.message === 'Name Required');
  });

  it('requires a name longer than 2 characters', () => {
    const user = new User({ name: 'al' });
    const validationResult = user.validateSync();
    assert(validationResult.errors.name.message === 'Name must be at least 3 characters');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be at least 3 characters');
        done();
      });
  });
});
