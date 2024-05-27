const express = require('express');
const db = require('./config/connection');
const routes = require('./routes')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));//backwards compatible
app.use(express.json());

app.use(routes);//server hass access to routes now

db.once('open', ()=>{
  app.listen (PORT, () => {
    console.log(`API server running on post ${PORT}`);
  });
});