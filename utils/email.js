// const { htmlToText } = require('html-to-text');
const nodemailer = require('nodemailer');

module.exports = class {
  constructor(user,url){
    this.to = user.email;
    this.firstname = user.firstname;
    this.url = url;
    this.from = `ECTAJ <${process.env.MAIL_FROM} >`;
  }

  transporter(){
    
      return nodemailer.createTransport({
        service:'SendGrid',
        auth:{
          user:process.env.SENDGRID_USERNAME,
          pass:process.env.SENDGRID_PASSWORD 
        }
      });
    
    return nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth:{
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    })
  }

  async send(template,subject){
    //html message to be sent
    // const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`,{
    //   firstName: this.firstName,
    //   url: this.url
    // });
    //mail options
    const mailOptions = {
      from : this.from,
      to: this.to,
      subject,
      html: template,
      // text:htmlToText(template)
    };
    //send transporter
    await this.transporter().sendMail(mailOptions);  
  }
  
  async sendOtp(otp){
    return true 
  }
  
  async sendWelcome(){
    await this.send('welcome','Welcome to Natours, The fun is about to begin');
  }

  async sendPasswordReset(){
    await this.send('passwordReset','Reset Password, this would last for 10mins')
  }
}

// const sendEmail = async (options) =>{
// // create transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: process.env.MAIL_PORT,
//     auth:{
//       user: process.env.MAIL_USERNAME,
//       pass: process.env.MAIL_PASSWORD
//     }
//   })

//   //define the email option
//   const mailOptions = {
//     from : 'Ayobami <hello@ayobami >',
//     to: options.email,
//     subject: options.subject,
//     text:options.message
//   };

//   await transporter.sendMail(mailOptions);
// }

// module.exports = sendEmail;
