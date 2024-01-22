/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('karyawan_proyek', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    id_karyawan: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    id_proyek: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('karyawan_proyek');
};
