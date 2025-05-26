const Roles = Object.freeze({
  AUTHOR: 'author',
  ADMIN: 'admin',
});

const roles = Object.values(Roles);

module.exports = {
  roles,
  Roles
};
