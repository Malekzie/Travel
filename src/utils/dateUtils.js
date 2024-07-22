// dateUtils.js

/**
 * Converts a date to ISO format.
 * @param {string|Date} date - The date to convert.
 * @returns {string} The ISO formatted date.
 */
const convertDateToISO = (date) => {
     const parsedDate = new Date(date);
     return parsedDate.toISOString();
 };
 
 module.exports = {
     convertDateToISO
 };
 