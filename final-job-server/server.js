const http = require('http');
const app = require('./app')
const mongoose = require('mongoose');
const server = http.createServer(app);
require('dotenv').config();

let db="mongodb+srv://nikhom123:meemee@cluster0-7ll9a.gcp.mongodb.net/finalproject?retryWrites=true";

if(process.env.MONGO_URI){
  db=process.env.MONGO_URI
}

mongoose
  .connect(
    db,
    { useNewUrlParser: true ,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const port=process.env.PORT;
//const port = process.env.PORT||3001;

server.listen(port, (err) => {
    console.log(`listening on :${port}`);
});