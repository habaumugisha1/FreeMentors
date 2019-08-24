export default (UserReturnData) => ({
  firstname: UserReturnData.firstname,
  lastname: UserReturnData.lastname,
  email: UserReturnData.email,
  token: UserReturnData.token,
  password: UserReturnData.password,
});
