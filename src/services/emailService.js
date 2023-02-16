import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: '"Duy Dev 👻" <duy@example.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bênh", // Subject line
    html: `<h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đặt lịch khám bệnh</p>
    <p>Thông tin đặt lệnh khám bệnh</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để 
    xác nhận và hoàn tất thủ tục đặt lịch khám bênh.
    </p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>

    <div>Xin chân thành cảm on</div>
    `, // html body
  });
};

let sendAttachment = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: '"Duy Dev 👻" <duy@example.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Thông tin đặt lịch khám bênh", // Subject line
    html: `<h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đặt lịch khám bệnh</p>
    <p>Kết quả đặt lệnh khám bệnh</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để 
    xác nhận và hoàn tất thủ tục đặt lịch khám bênh.
    </p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>

    <div>Xin chân thành cảm on</div>
    `,
    attachments: [
      {
        filename: "text1.txt",
        content: "aGVsbG8gd29ybGQh",
        encoding: "base64",
      },
    ],
  });
};

const emailService = { sendSimpleEmail: sendSimpleEmail, sendAttachment: sendAttachment };
export default emailService;
