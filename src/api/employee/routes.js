const routes = (handler) => [
  {
    method: 'POST',
    path: '/employee',
    handler: handler.postEmployeeHandler,
  },
];

module.exports = routes;
