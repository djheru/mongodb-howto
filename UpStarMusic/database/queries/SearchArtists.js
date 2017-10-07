const Artist = require('../models/artist');

const buildQuery = ({ name, age, yearsActive }) => {
  const query = {};
  if (name) {
    // Must add text index to name
    // db.artists.createIndex({ name: "text" })
    query.$text = { $search: name };
  }
  if (age) {
    query.age =  { $gte: age.min, $lte: age.max };
  }
  if (yearsActive) {
    query.yearsActive = { $gte: yearsActive.min, $lte: yearsActive.max };
  }
  return query;
};

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = buildQuery(criteria);
  return Promise
    .all([
      Artist
        .find(query)
        .sort({ [sortProperty]: 1 })
        .skip(offset)
        .limit(limit),
      Artist.count(query)
    ])
    .then(results => ({ all: results[0], count: results[1], offset, limit }));
};
