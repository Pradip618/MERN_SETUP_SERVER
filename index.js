
const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config();

const port = process.env.PORT||5002;
const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`server started at port ${port}`)
});

process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0);
    });
  });

module.exports = server;