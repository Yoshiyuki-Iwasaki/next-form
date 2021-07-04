import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { getMaxListeners } from "process";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { firstName, lastName, Email, mobileNumber, Title, Developer, token } =
    req.body;
  console.log(
    "firstName",
    firstName,
    "lastName",
    lastName,
    "Email",
    Email,
    "mobileNumber",
    mobileNumber,
    "Title",
    Title,
    "Developer",
    Developer,
    "token",
    token
  );

  const human = await validateHuman(token);
  if (!human) {
    res.status(400);
    res.json({ errors: ["bot"] });
  }
  console.log("human", human);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const output_subject = `Contact form submission from ${firstName}`;
  const output_html = `<p>メールが送信されました。ご回答までお待ちください。</p>
      <p><strong>firstName: </strong>${firstName}</p>
      <p><strong>lastName: </strong>${lastName}</p>
      <p><strong>Email: </strong>${Email}</p>
      <p><strong>mobileNumber: </strong>${mobileNumber}</p>
      <p><strong>Title: </strong>${Title}</p>
      <p><strong>Developer: </strong>${Developer}</p>
  `;

  try {
    const emailRes = await transporter.sendMail({
      from: Email,
      to: `${Email},armada3524@gmail.com`,
      subject: output_subject,
      html: output_html,
    });
    console.log("emailRes", emailRes.messageId);
  } catch (error) {
    console.log("errorだよ", error);
  }

  res.status(200).json(req.body);
}

async function validateHuman(token: any) {
  const secret = "6LfeXzsbAAAAAJ2XSd50WHtufM3PWW7RsprZrf7d";
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: "POST" }
  );
  const data = await response.json();
  console.log("data", data);

  return data.success;
}
