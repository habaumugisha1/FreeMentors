export default (email, users) => {
  const existUser = users.find((user) => user.email === email);
  if (existUser) return false;
  return true;
};
