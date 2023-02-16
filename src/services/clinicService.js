import db from "../models/index";
const createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.address || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
      }

      resolve({
        errCode: 0,
        errMessage: "ok",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let clinic = await db.Clinic.findAll();
      if (clinic && clinic.length > 0) {
        clinic.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        data: clinic,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailClinic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: id,
          },
          attributes: ["name", "address", "descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_infor.findAll({
            where: { clinicId: id },
            attributes: ["provinceId"],
          });
          data.doctorClinic = doctorClinic;
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const clinicService = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinic: getDetailClinic,
};

export default clinicService;
