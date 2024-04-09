// processors/index.js
import sendEmailCreationEmail from "../mail/sendAccountCreationEmail.js";
import Queue from "bull";
import { REDIS_PORT, REDIS_URI } from "../Connection/redis.js";

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

emailQueue.process(async (job, done) => {
  const { email } = job.data;
  try {
    await sendEmailCreationEmail({
      email,
    });
    done();
  } catch (error) {
    console.log(error);
    throw error;
  }
});

emailQueue.on("completed", (job) => {
  console.log(`completed# ${job.id}job`);
});
