import doctorService from "../services/doctorService";
const getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }
  try {
    let doctors = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const postInforDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.saveDetailInforDoctors(req.body);
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const getDetailDoctorById = async (req, res) => {
  try {
    let doctors = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const bulkCreateSchedule = async (req, res) => {
  try {
    const schedule = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const getScheduleByDate = async (req, res) => {
  try {
    let schedule = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
    return res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const getExtraInforDoctorById = async (req, res) => {
  try {
    let doctorInfor = await doctorService.getExtraInforDoctorById(req.query.doctorId);
    return res.status(200).json(doctorInfor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const getProfileDoctorById = async (req, res) => {
  try {
    let doctorProfile = await doctorService.getProfileDoctorById(req.query.doctorId);
    return res.status(200).json(doctorProfile);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const getListPatientForDoctor = async (req, res) => {
  try {
    let Patient = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date);
    return res.status(200).json(Patient);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const sendRemedy = async (req, res) => {
  try {
    const remery = await doctorService.sendRemedy(req.body);
    return res.status(200).json(remery);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const doctorController = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctors: getAllDoctors,
  postInforDoctors: postInforDoctors,
  getDetailDoctorById: getDetailDoctorById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforDoctorById: getExtraInforDoctorById,
  getProfileDoctorById: getProfileDoctorById,
  getListPatientForDoctor: getListPatientForDoctor,
  sendRemedy: sendRemedy,
};

export default doctorController;
