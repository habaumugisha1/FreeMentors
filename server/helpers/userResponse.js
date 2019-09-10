export default (UserReturnData) => ({
  lastname: UserReturnData.lastName,
  firstname: UserReturnData.firstName,
  email: UserReturnData.email,
  token: UserReturnData.token,
});
