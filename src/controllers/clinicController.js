import clinicService from "../services/clinicService";

const createClinic = async (req, res) => {
  try {
    let clinic = await clinicService.createClinic(req.body);
    return res.status(200).json(clinic);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const getAllClinic = async (req, res) => {
  try {
    let clinic = await clinicService.getAllClinic();
    return res.status(200).json(clinic);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
const getDetailClinic = async (req, res) => {
  try {
    let clinic = await clinicService.getDetailClinic(req.query.id);
    return res.status(200).json(clinic);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
const clinicController = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinic: getDetailClinic,
};

export default clinicController;
