import specialtyService from "../services/specialtyService";

const createSpecialty = async (req, res) => {
  try {
    const data = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const getAllSpectial = async (req, res) => {
  try {
    let specialties = await specialtyService.getAllSpectial();
    return res.status(200).json(specialties);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
const getDetailSpectial = async (req, res) => {
  try {
    let specialties = await specialtyService.getDetailSpectial(req.query.id, req.query.location);
    return res.status(200).json(specialties);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
const specialtyController = {
  createSpecialty: createSpecialty,
  getAllSpectial: getAllSpectial,
  getDetailSpectial: getDetailSpectial,
};

export default specialtyController;
