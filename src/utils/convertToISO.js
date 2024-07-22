const convertDateToISO = (date) => {
     return date ? new Date(date).toISOString() : null;
 };

 module.exports = {
     convertDateToISO,
 };