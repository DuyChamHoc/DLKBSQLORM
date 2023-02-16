import db from "../models/index";
import CRUDService from "../services/CRUDService";

const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll({
      raw: true,
    });
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
};

const getCRUD = async (req, res) => {
  const data = await CRUDService.getAllUser();
  return res.send(data);
};

const postCRUD = async (req, res) => {
  const message = await CRUDService.createNewUser(req.body);
  return res.send(req.body);
};

const getEditCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const userData = await CRUDService.getUserInfoById(userId);
    return res.send(userData);
  } else {
    return res.send("User not found");
  }
};

const putCRUD = async (req, res) => {
  const data = req.body;
  const allUsers = await CRUDService.updateUserData(data);
  return res.send(allUsers);
};

const deleteCRUD = async (req, res) => {
  const id = req.query.id;
  if (id) {
    const allUsers = await CRUDService.deleteUserData(id);
    return res.send(allUsers);
  } else {
    return res.send("User not found");
  }
};

const homeController = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};

export default homeController;
