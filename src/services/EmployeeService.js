const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');

class EmployeeService {
  constructor() {
    this._pool = new Pool();
  }

  async addEmployee({ name, role }) {
    const id = `employee-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO karyawan VALUES($1, $2, $3) RETURNING id',
      values: [id, name, role],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Karyawan gagal ditambahkan');
    }
    return result.rows[0].id;
  }
}

module.exports = EmployeeService;
