/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('karyawan', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    nama_lengkap: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    id_jabatan: {
      type: 'VARCHAR(50)',
      references: 'jabatan(id)', // Define foreign key reference
      notNull: true,
      onDelete: 'CASCADE', // Enforce cascading deletion
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('karyawan');
};
