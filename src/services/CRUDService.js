import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
import db from "../models/index";

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender == "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("create a new user success");
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = db.User.findAll({ raw: true });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserInfoById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (users) {
        resolve(users);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();

        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUserData = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        await user.destroy();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

const CRUDService = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserData: deleteUserData,
};

export default CRUDService;
