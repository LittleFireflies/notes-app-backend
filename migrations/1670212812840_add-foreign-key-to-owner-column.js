/* eslint-disable camelcase */

exports.up = (pgm) => {
  // create new user for unowned notes
  pgm.sql(
      'INSERT INTO users(id, username, password, fullname) ' +
      'VALUES (\'old_notes\', \'old_notes\', \'old_notes\', \'old notes\')');

  // update null owner
  pgm.sql('UPDATE notes SET owner = \'old_notes\' WHERE owner IS NULL');

  // create constraint
  pgm.addConstraint(
      'notes',
      'fk_notes.owner_users.id',
      'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  // delete fk_notes.owner_users.id constraint from table notes
  pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

  // update owner old_notes values to NULL
  pgm.sql('UPDATE notes SET owner = NULL WHERE owner = \'old_notes\'');

  // delete new user
  pgm.sql('DELETE FROM users WHERE id = \'old_notes\'');
};
