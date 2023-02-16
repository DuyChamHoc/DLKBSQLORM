import db from "../models/index";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = {};
      const isExist = await checkUserEmail(email);
      if (isExist) {
        const user = await db.User.findOne({
          attributes: ["id", "email", "roleId", "password", "lastName", "firstName"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found~`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your' Email isn't exist in your system. Please try other email`;
      }
      resolve(userData);
    } catch (error) {
      resolve(error);
    }
  });
};

const checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const GetAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId == "All") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }

      if (userId && userId != "All") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

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
const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          errmessage: "Your email address is already",
        });
      } else {
        const hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          message: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: id },
      });
      if (user) {
        // await user.destroy();
        await db.User.destroy({
          where: { id: id },
        });
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve({ errCode: 2, message: "User isn't exist" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          message: "id not provided",
        });
      }
      const user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = data.gender;
        user.phonenumber = data.phonenumber;

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

const getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = {};
      if (!typeInput) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
      }

      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

const userService = {
  handleUserLogin: handleUserLogin,
  GetAllUsers: GetAllUsers,
  createNewUser: createNewUser,
  updateUserData: updateUserData,
  deleteUser: deleteUser,
  getAllCodeService: getAllCodeService,
};

export default userService;
