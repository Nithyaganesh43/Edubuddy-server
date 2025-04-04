
const server = require('express').Router();
const cors = require("cors");

let allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'https://v0-new-project-cckdh8yagwu-5e1qsm.vercel.app',
];

app.get('/cors/:newUrl', (req, res) => {
  let newOrigin = decodeURIComponent(req.params.newUrl);
  if (!allowedOrigins.includes(newOrigin)) {
    allowedOrigins.push(newOrigin);
    res.json({ message: 'New origin added', allowedOrigins });
  } else {
    res.json({ message: 'Origin already exists', allowedOrigins });
  }
});
server.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

server.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});
 
server.get('/ping', async (req, res) => { 
  console.log("Pong");
  res.send('Pong from Server 1'); 
}); 
module.exports=server;