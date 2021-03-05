// const express = require("express");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const dotenv = require("dotenv");

// const cors = require("cors");

// dotenv.config();

// // set up server

// const app = express();
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000"  ],
//     credentials: true,
//   })
// );


// // Connect to Mongo
// mongoose.connect(process.env.DATABASE_ACCESS,
//          { useNewUrlParser: true, useUnifiedTopology: true }
//                     )
//                     .then(() => console.log('DATABASE Connected'))
//                      .catch(e => console.log('error db:', e))


// // set up routes

// app.use("/auth", require("./routers/userRouter"));
const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");

const mongoose = require('mongoose');

const dotenv = require ('dotenv');

dotenv.config();
const app = express();
const cors = require('cors');

// Initiate Mongo Server
mongoose.connect(process.env.DATABASE_ACCESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
               .then(() => console.log('DATABASE Connected'))
                .catch(e => console.log('error db:', e))

  app.use(cors({ origin: [
                      "http://localhost:3000"  ],
                    credentials: true,
                  })
                );

// PORT
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);


//require in routers
const recipes = require('./routes/recipes');
//router- /recipes/
//add api routes here
app.use('/recipes', recipes);


app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});