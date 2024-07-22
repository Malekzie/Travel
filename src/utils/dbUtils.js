
/**
 * Upserts a record in the database.
 * @param {string} modelName - The name of the model.
 * @param {string} uniqueField - The unique field for upsert.
 * @param {object} where - The where clause for finding the record.
 * @param {object} updateData - The data to update.
 * @param {object} createData - The data to create if the record does not exist.
 * @returns {Promise<object>} The upserted record.
 */
const upsertRecord = async (modelName, uniqueField, where, updateData, createData) => {
     const model = db[modelName];
 
     return await db.$transaction(async (transaction) => {
         const existingRecord = await model.findFirst({ where });
 
         if (existingRecord) {
             return await model.update({
                 where: { [uniqueField]: where[uniqueField] },
                 data: updateData
             });
         } else {
             return await model.create({ data: createData });
         }
     });
 };
 
 module.exports = {
     upsertRecord
 };
 