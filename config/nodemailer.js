const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");

var transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: "kannatokanhaiya@gmail.com",
    pass: "oeytpzrkijughbtq", // go to myaccount.google.com/security 2step verification then on then app password
  },
});

// ejs.renderFile(
//   __dirname + "/test.ejs",
//   { name: "Stranger" },
//   function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       var mainOptions = {
//         from: '"Tester" testmail@zoho.com',
//         to: "totest@zoho.com",
//         subject: "Hello, world",
//         html: data,
//       };
//       console.log("html data ======================>", mainOptions.html);
//       transporter.sendMail(mainOptions, function (err, info) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log("Message sent: " + info.response);
//         }
//       });
//     }
//   }
// );

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