/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('authentications', {
    token: {
      type: 'Text',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('authentications');
};
