import db from "../models/index";
const createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
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

const getAllSpectial = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let specialties = await db.Specialty.findAll();
      if (specialties && specialties.length > 0) {
        specialties.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        data: specialties,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailSpectial = (id, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !location) {
        resolve({
          errCode: 1,
          message: "Missing required parameter",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: id,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let doctorSpecialty = [];
          if (location == "ALL") {
            doctorSpecialty = await db.Doctor_infor.findAll({
              where: { specialtyId: id },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorSpecialty = await db.Doctor_infor.findAll({
              where: { specialtyId: id, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }

          data.doctorSpecialty = doctorSpecialty;
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
const specialtyService = {
  createSpecialty: createSpecialty,
  getAllSpectial: getAllSpectial,
  getDetailSpectial: getDetailSpectial,
};

export default specialtyService;
