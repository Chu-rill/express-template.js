const nodemailer = require("nodemailer");

// nodemailer setup
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
};

export const sendEmail = async (to, subject, text, template, context) => {
  const transporter = createTransporter();

  const hbsOptions = {
    viewEngine: {
      defaultLayout: false,
    },
    viewPath: "views",
  };

  transporter.use("compile", hbs(hbsOptions));

  const mailOptions = {
    from: {
      name: "New App",
      address: process.env.NODEMAILER_MAIL,
    },
    to: Array.isArray(to) ? to.join(", ") : to,
    subject: subject,
    text: text,
    template: template,
    context: context,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
