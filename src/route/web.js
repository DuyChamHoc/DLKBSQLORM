import express from "express";
import doctorController from "../controllers/doctorController.js";
import homeController from "../controllers/homeController.js";
import userController from "../controllers/userController.js";
import patientController from "../controllers/patientController.js";
import specialtyController from "../controllers/specialtyController.js";
import clinicController from "../controllers/clinicController.js";

let router = express.Router();

export const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/get-crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.put("/put-crud", homeController.putCRUD);
  router.delete("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-users", userController.handleCreateNewUsers);
  router.put("/api/edit-users", userController.handleEditUsers);
  router.delete("/api/delete-new-users", userController.handleDeleteUsers);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctors", doctorController.postInforDoctors);
  router.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctorById);
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-schedule-doctor-by-date", doctorController.getScheduleByDate);
  router.get("/api/get-extra-infor-doctor-by-id", doctorController.getExtraInforDoctorById);
  router.get("/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById);

  router.get("/api/get-list-patient-for-doctor", doctorController.getListPatientForDoctor);
  router.post("/api/send-remedy", doctorController.sendRemedy);

  router.post("/api/patient-book-appointment", patientController.postBookAppointment);
  router.post("/api/verify-book-appointment", patientController.postveriifyBookAppointment);

  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-all-specialty", specialtyController.getAllSpectial);
  router.get("/api/get-detail-specialty-by-id", specialtyController.getDetailSpectial);

  router.post("/api/create-new-sclinic", clinicController.createClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get("/api/get-detail-clinic-by-id", clinicController.getDetailClinic);

  return app.use("/", router);
};
