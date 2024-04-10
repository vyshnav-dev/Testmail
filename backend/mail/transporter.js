import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "399c0bdf17bd14",
    pass: "638afab4fcb347",
  },
});

// Checking connection
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail server is running...");
  }
});

export default transporter;
