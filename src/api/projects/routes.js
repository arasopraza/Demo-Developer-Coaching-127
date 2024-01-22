const routes = (handler) => [
  {
    method: 'POST',
    path: '/projects',
    handler: handler.postProjectsHandler,
  },
  {
    method: 'POST',
    path: '/projects/{id_project}/employee',
    handler: handler.postProjectsEmployeeHandler,
  },
];

module.exports = routes;
