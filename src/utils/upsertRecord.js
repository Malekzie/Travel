const upsertRecord = async (model, uniqueField, whereClause, updateData, createData) => {
     return await db[model].upsert({
         where: whereClause,
         update: updateData,
         create: createData
     });
 };
 
 module.exports = {
     upsertRecord
 };