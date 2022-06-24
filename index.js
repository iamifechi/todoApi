const express = require("express");
const { json } = require("express");
const route = require("./routes/flightRoute");

const app = express();

const port = process.env.PORT || 8080;

app.use(json());

// Mount router
app.use("/api/v1/flights", route);


app.get('/', (req, res) =>
  res.status(202).send({ 
    message: 'Welcome to Ifechi Flight Booking Api' 
  })
);

app.use('**', (req, res) =>
  res.status(404).send({ message: 'Route not found' })
);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
