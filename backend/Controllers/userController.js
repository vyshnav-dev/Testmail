import { REDIS_PORT, REDIS_URI } from "../Connection/redis.js";
import User from "../Modals/userModal.js";
import sendEmailCreationEmail from "../mail/sendAccountCreationEmail.js";
import Queue from "bull";




const emailQueue = new Queue("emailQueue", {
  limiter: {
    max: 2, 
    duration: 60000, 
  },
  redis: {
    port: REDIS_PORT,
    host: REDIS_URI,
  },
});

const userData = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.create({ email });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const emailData = async (req, res) => {
  try {
    const users = await User.find();
    users.forEach((user, index) => {
      const { email } = user
      emailQueue.add({ email: email }).then(() => {
        if (index + 1 === users.length) {
          res.json({
            message: "users added to queue",
          });
        }
      });
      // Adding email to the rate-limited queue as well
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export { userData, emailData };
