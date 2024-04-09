
import transporter from "./transporter.js";

const sendEmailCreationEmail = async ({ email }) => {
  

  const mainOptions = {
    from: 'elmer52@ethereal.email',
    to: email,
    subject: "Account Activated",
    text: 'hello',
  };

  await transporter.sendMail(mainOptions);
};

export default sendEmailCreationEmail;
