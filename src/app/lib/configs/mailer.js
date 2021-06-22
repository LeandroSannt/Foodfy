const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({

  service:'Hotmail',
  auth: {
    user: 'lsn_cearamor@hotmail.com',
    pass: 'Cearamor1@'
  },
  });