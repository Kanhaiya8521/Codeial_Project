const nodemailer = require('./../config/nodemailer');

exports.newComment = (comment) => {
    // console.log('inside newComment mailer', comment);
    let htmlString = nodemailer.renderTemplate({comment: comment}, '../mailers/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: 'kannatokanhaiya@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: htmlString
    }, (err, info) => {
        if(err) {console.log('Error in sending mail', err); return;}
        // console.log('Message sent', info);
        return;
    });
}