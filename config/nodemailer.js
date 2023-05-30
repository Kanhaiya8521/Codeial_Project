const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const env = require('./environment')

var transporter = nodemailer.createTransport(env.smtp);
// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // use SSL
//   auth: {
//     user: "kannatokanhaiya@gmail.com",
//     pass: "oeytpzrkijughbtq", // go to myaccount.google.com/security 2step verification then on then app password
//   },
// });



let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template) {
            if(err) {console.log('error in rendering template', err); return}
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}