const server = require("./services/server");
const { initWsServer, getWsServer } = require("./services/socket");

const port = 8080;

const init = async () => {
  initWsServer(server);
  server.listen(port, () => console.log(`Server up port ${port}`));
  server.on("error", (error) => {
    console.log("Server catch!", error);
  });
};

init();



/* const server = require('./services/server');

const puerto = 8080;
server.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
); */