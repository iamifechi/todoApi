const express = require("express");
const { json } = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/todoRoute");
require("dotenv/config");
const {transporter} = require("./utils/nodemail")

const app = express();

const port = process.env.PORT || 8080;
app.use(json());

const connectDB = async () => {
  try{
  const conn = await mongoose.connect(process.env.MONGO_URI, {
     useNewUrlParser: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (err) {
  console.error(err)
  process.exit(1)
}
}

//Connect to MongoDB
connectDB()

// Mount route
app.use("/api/v1/todo", routes);

//Array of Bulk Recipients
let recipients = ['example@gmail.com','iamifechi@gmail.com']

let mailOptions = {
  from: 'iamifechi@gmail.com',
  to: recipients,
  subject: 'Congratulations on creating your Email Sender NodeJs',
  text: 'Keep going!!!'
};

transporter.sendMail(mailOptions, function(err, data) {
  if (err) {
    console.log("Error " + err);
  } else {
    console.log("Email sent successfully");
  }
});


app.get('/', (req, res) =>
  res.status(202).send({ 
    message: 'Welcome to Ifechi MongoDB CRUD Todo Task API' 
  })
);

app.use('**', (req, res) =>
  res.status(404).send({ message: 'Route not found' })
);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
