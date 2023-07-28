// const express = require("express");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const randomstring = require("randomstring");
// const path = require("path");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// function generateOTP() {
//   return randomstring.generate({
//     length: 6,
//     charset: "numeric",
//   });
// }

// const otpStorage = new Map();

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.post("/send-otp", (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ error: "Email address is required." });
//   }

//   const otp = generateOTP();
//   otpStorage.set(email, otp);

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   //   const mailOptions = {
//   //     from: process.env.EMAIL_USER,
//   //     to: email,
//   //     subject: 'OTP Verification',
//   //     text: `Your OTP for email verification is: ${otp}`,
//   //   };

//   const emailTemplate = `
// <div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
//   <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
//     <div style="border-bottom: 1px solid #eee;">
//       <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600;">MoneyBridge</a>
//     </div>
//     <p style="font-size: 1.1em;">Hi,</p>
//     <p>Thank you for choosing MoneyBridge. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
//     <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">{otp}</h2>
//     <p style="font-size: 0.9em;">Regards,<br />MoneyBridge</p>
//     <hr style="border: none; border-top: 1px solid #eee;" />
//     <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
//       <p>Jiyauddin Saiyad</p>
//       <p>MoneyBridge</p>
//       <p>India</p>
//     </div>
//   </div>
// </div>
// `;
//   const htmlTemplate = emailTemplate.replace("{otp}", otp);

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "OTP Verification",
//     html: htmlTemplate,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({ error: "Failed to send OTP." });
//     } else {
//       console.log("Email sent: " + info.response);
//       return res.json({ message: "OTP sent successfully." });
//     }
//   });
// });

// app.post("/verify-otp", (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ error: "Email and OTP are required." });
//   }

//   const storedOTP = otpStorage.get(email);

//   if (!storedOTP || storedOTP !== otp) {
//     return res.status(400).json({ error: "Invalid OTP." });
//   }

//   otpStorage.delete(email);

//   return res.json({ message: "OTP verified successfully." });
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

const otpStorage = new Map();

app.post("/send-otp", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email address is required." });
  }

  const otp = generateOTP();
  otpStorage.set(email, otp);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailTemplate = `
<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2;">
  <div style="margin: 50px auto; width: 70%; padding: 20px 0;">
    <div style="border-bottom: 1px solid #eee;">
      <a href="" style="font-size: 1.4em; color: #00466a; text-decoration: none; font-weight: 600;">MoneyBridge</a>
    </div>
    <p style="font-size: 1.1em;">Hi,</p>
    <p>Thank you for choosing MoneyBridge. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a; margin: 0 auto; width: max-content; padding: 0 10px; color: #fff; border-radius: 4px;">{otp}</h2>
    <p style="font-size: 0.9em;">Regards,<br />MoneyBridge</p>
    <hr style="border: none; border-top: 1px solid #eee;" />
    <div style="float: right; padding: 8px 0; color: #aaa; font-size: 0.8em; line-height: 1; font-weight: 300;">
      <p>Jiyauddin Saiyad</p>
      <p>MoneyBridge</p>
      <p>India</p>
    </div>
  </div>
</div>
`;
  const htmlTemplate = emailTemplate.replace("{otp}", otp);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    html: htmlTemplate,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to send OTP." });
    } else {
      console.log("Email sent: " + info.response);
      return res.json({ message: "OTP sent successfully.", otp }); // Send the generated OTP in the response
    }
  });
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required." });
  }

  const storedOTP = otpStorage.get(email);

  if (!storedOTP || storedOTP !== otp) {
    return res.status(400).json({ error: "Invalid OTP." });
  }

  otpStorage.delete(email);

  return res.json({ message: "OTP verified successfully." });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
