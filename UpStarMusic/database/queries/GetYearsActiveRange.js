const Artist = require('../models/artist');
const getRange = require('./GetRange');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => getRange(Artist, 'yearsActive');
