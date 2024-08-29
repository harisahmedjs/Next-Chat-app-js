import User from "@/models/userModal";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }) => {
  // Await the result of the hashing function
  const hashedToken = await bcryptjs.hash(userId.toString(), 10);

  // Update user in the database with the hashed token
  if (emailType === "VERIFY") {
    await User.findByIdAndUpdate(userId, {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000, // 1 hour expiration
    });
  } else if (emailType === "RESET") {
    await User.findByIdAndUpdate(userId, {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiration
    });
  }

  try {
    // Configure the email transport using nodemailer
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c971e64501beff",
        pass: "b3fa7a5377265d"
      }
    });

    // Define the email options
    const mailOption = {
      from: "harisahmednetwork@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "verify your email" : "reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
    };

    // Send the email and return the response
    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error) {
    // Handle errors
    throw new Error(error.message);
  }
};
