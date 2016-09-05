'use strict';

/*
 * This function is used to evaluate if an object
 * has all of the properties listed in an array
 * @param {string[]} a - The array of property names
 * @param {Object} o - The object to test against
 * @returns {boolean}
 */
const checkProperties = (a, o) => a.every(e => o.hasOwnProperty(e));

module.exports.checkProperties = checkProperties;

