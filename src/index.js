const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/index'));

app.listen(PORT, () => console.log(`listening on port ${ PORT }`));
