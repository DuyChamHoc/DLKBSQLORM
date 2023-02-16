import db from "../models/index";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import emailService from "./emailService";

dotenv.config();

const buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}$doctorId=${doctorId}`;
  return result;
};

const postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.date ||
        !data.timeType ||
        !data.fullnme ||
        !data.timeString ||
        !data.doctorName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          data: "Missing required schedule",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.fullnme,
          time: data.timeString,
          doctorName: data.doctorName,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });

        const user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullName,
          },
        });
        // console.log(user);

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }

        resolve({ errCode: 0, message: "Save book success" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const postveriifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          data: "Missing required schedule",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({ errCode: 0, message: "Update appointment success" });
        } else {
          resolve({ errCode: 2, message: "schedule not exist" });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const patientService = {
  postBookAppointment: postBookAppointment,
  postveriifyBookAppointment: postveriifyBookAppointment,
};

export default patientService;
