export default (email, users) => {
  const userFound = users.find((user) => user.email === email);
  if (userFound) return false;
  return true;
};
