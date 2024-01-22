const ClientError = require('../../exceptions/ClientError');

class EmployeeHandler {
  constructor(service) {
    this._service = service;

    this.postEmployeeHandler = this.postEmployeeHandler.bind(this);
  }

  async postEmployeeHandler(request, h) {
    try {
      const { name, role } = request.payload;

      const id = await this._service.addEmployee({ name, role });

      const response = h.response({
        status: 'success',
        message: 'Karyawan berhasil ditambahkan',
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

module.exports = EmployeeHandler;
