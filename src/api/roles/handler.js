const ClientError = require('../../exceptions/ClientError');

class RolesHandler {
  constructor(service) {
    this._service = service;

    this.postRolesHandler = this.postRolesHandler.bind(this);
  }

  async postRolesHandler(request, h) {
    try {
      const { name, salary } = request.payload;

      const id = await this._service.addRole({ name, salary });

      const response = h.response({
        status: 'success',
        message: 'Jabatan berhasil ditambahkan',
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

module.exports = RolesHandler;
