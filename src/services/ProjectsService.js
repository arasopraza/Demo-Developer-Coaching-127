const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');

class ProjectsService {
  constructor() {
    this._pool = new Pool();
  }

  async addProject({ name }) {
    const id = `project-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO proyek VALUES($1, $2) RETURNING id',
      values: [id, name],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Proyek gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async assignEmployeeToProject({ id_employee, id_project }) {
    console.log();
    const id = `ep-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO karyawan_proyek VALUES($1, $2, $3) RETURNING id',
      values: [id, id_employee, id_project],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal menambahkan karyawan ke proyek');
    }
    return result.rows[0].id;
  }
}

module.exports = ProjectsService;
