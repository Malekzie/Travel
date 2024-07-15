const app = require('./app');
const port = process.env.PORT || 4000;

app.listen(port, () => {
     console.log(`Test Server is running on port http://localhost:${port} ...`);
});