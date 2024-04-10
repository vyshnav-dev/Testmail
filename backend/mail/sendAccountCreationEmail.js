import transporter from "./transporter.js";
import User from "../Modals/userModal.js";
const sendEmailCreationEmail = async ({ email }) => {
  const mainOptions = {
    from: "elmer52@ethereal.email",
    to: email,
    subject: "Account Activated",
    text: "hello",
  };

  try {
    await transporter.sendMail(mainOptions);

    await User.findOneAndUpdate({ email: email }, { isSend: true });

    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmailCreationEmail;
