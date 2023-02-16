import userService from "../services/userService";

const handleLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

const handleGetAllUsers = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  const users = await userService.GetAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

const handleCreateNewUsers = async (req, res) => {
  const message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

const handleEditUsers = async (req, res) => {
  const data = req.body;
  const message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

const handleDeleteUsers = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing id",
    });
  }
  const message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

const getAllCode = async (req, res) => {
  try {
    const data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
      users,
    });
  }
};

const userController = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUsers: handleCreateNewUsers,
  handleEditUsers: handleEditUsers,
  handleDeleteUsers: handleDeleteUsers,

  getAllCode: getAllCode,
};

export default userController;
