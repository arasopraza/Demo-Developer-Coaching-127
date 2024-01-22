const Handler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'employee',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new Handler(service);
    server.route(routes(handler));
  },
};
