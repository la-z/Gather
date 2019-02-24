const nodeMailer = require('nodemailer');

const sender = process.env.EMAIL_SENDER;
const password = process.env.EMAIL_PASS;
const transporter = nodeMailer.createTransport(`${sender}:${password}@smtp.gmail.com`);

module.exports = (emails, event) => {
  const mailOptions = {
    from: '"Gatherbot" <gather.bot.invitations@gmail.com>',
    to: emails.join(', '),
    subject: "You're invited to an event from Gather!",
    text: `Follow the link at <INSERT-DOMAIN-NAME-HERE>/events/${event.id} to respond to your invitation.
    
    Thanks,
      Gatherbot`,
  };

  return transporter.sendMail(mailOptions);
};
