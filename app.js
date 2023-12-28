require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect');

const authenticateUser = require('./middleware/authentication');

//routers
const authRouter = require('./routes/auth');
const slotsRouter = require('./routes/slots');
const appointmentsRouter = require('./routes/appointments');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());

// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/slots', authenticateUser, slotsRouter);
app.use('/api/v1/appointments', authenticateUser, appointmentsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
  try {
    await connectDB("mongodb+srv://admin:admin@nodeexpress.lu2yhta.mongodb.net/?retryWrites=true&w=majority");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
