const { PrismaClient } = require('@prisma/client');
const { withAccelerate } = require('@prisma/extension-accelerate');
const db = new PrismaClient().$extends(withAccelerate());

module.exports = db;