const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const userRouter = require('./routes/userRouter.js');
const categoryRouter = require('./routes/categoryRouter.js');
const ticketRouter = require('./routes/ticketRouter.js');

const options = {
  origin:'http://127.0.0.1:5501'
}

app.use(cors(options));
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/ticket', ticketRouter);

app.listen(process.env.PORT, () => console.log(`Server in running on PORT ${process.env.PORT}`));

