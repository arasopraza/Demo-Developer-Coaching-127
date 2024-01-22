const routes = (handler) => [
  {
    method: 'POST',
    path: '/roles',
    handler: handler.postRolesHandler,
  },
];

module.exports = routes;
