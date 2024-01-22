const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');

class RolesService {
  constructor() {
    this._pool = new Pool();
  }

  async addRole({ name, salary }) {
    const id = `role-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO jabatan VALUES($1, $2, $3) RETURNING id',
      values: [id, name, salary],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Jabatan gagal ditambahkan');
    }
    return result.rows[0].id;
  }
}

module.exports = RolesService;
