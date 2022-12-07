/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    note_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint(
      'collaborations',
      'unique_note_id_and_user_id',
      'UNIQUE(note_id, user_id)',
  );

  pgm.addConstraint('collaborations', 'fk_collaborations.note_id_notes.id', {
    foreignKeys: {
      columns: 'note_id',
      references: 'notes(id)',
      onDelete: 'cascade',
    },
  });

  pgm.addConstraint('collaborations', 'fk_collaborations.user_id_users.id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('collaborations');
};
