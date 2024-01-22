// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const employee = require('./api/employee');
const roles = require('./api/roles');
const projects = require('./api/projects');
const EmployeeService = require('./services/EmployeeService');
const RolesService = require('./services/RolesService');
const ProjectsService = require('./services/ProjectsService');

const init = async () => {
  const employeeService = new EmployeeService();
  const rolesService = new RolesService();
  const projectsService = new ProjectsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    debug: {
      request: ['error'],
    },
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: employee,
      options: {
        service: employeeService,
      },
    },
    {
      plugin: roles,
      options: {
        service: rolesService,
      },
    },
    {
      plugin: projects,
      options: {
        service: projectsService,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
