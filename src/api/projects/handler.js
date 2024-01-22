const ClientError = require('../../exceptions/ClientError');

class ProjectsHandler {
  constructor(service) {
    this._service = service;

    this.postProjectsHandler = this.postProjectsHandler.bind(this);
    this.postProjectsEmployeeHandler = this.postProjectsEmployeeHandler.bind(this);
  }

  async postProjectsHandler(request, h) {
    try {
      const { name } = request.payload;

      const id = await this._service.addProject({ name });

      const response = h.response({
        status: 'success',
        message: 'Proyek berhasil ditambahkan',
        data: {
          id,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async postProjectsEmployeeHandler(request, h) {
    try {
      const { id_employee } = request.payload;
      const { id_project } = request.params;

      const id = await this._service.assignEmployeeToProject({ id_employee, id_project });

      const response = h.response({
        status: 'success',
        message: 'Berhasil ditambahkan',
        data: {
          id,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = ProjectsHandler;
