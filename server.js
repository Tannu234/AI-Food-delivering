const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });
connectDatabase();
PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});