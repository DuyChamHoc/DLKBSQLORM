import patientService from "../services/patientServices";
const postBookAppointment = async (req, res) => {
  try {
    const schedule = await patientService.postBookAppointment(req.body);
    return res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};

const postveriifyBookAppointment = async (req, res) => {
  try {
    const schedule = await patientService.postveriifyBookAppointment(req.body);
    return res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
const patientController = {
  postBookAppointment: postBookAppointment,
  postveriifyBookAppointment: postveriifyBookAppointment,
};

export default patientController;
