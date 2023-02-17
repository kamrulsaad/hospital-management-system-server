// mailgun

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
});

module.exports.sendMailWithMailGun = async (data) => {
    const result = await mg.messages
        .create("sandbox3902c3ffa6ab4991b1f389fac86081d5.mailgun.org", {
            from: "Mailgun Sandbox <postmaster@sandbox3902c3ffa6ab4991b1f389fac86081d5.mailgun.org>",
            to: data.to,
            subject: data.subject,
            text: data.text,
        });

    return result.id;

};