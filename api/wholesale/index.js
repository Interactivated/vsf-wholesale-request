import { apiStatus } from '../../../lib/util';
import { Router } from 'express';
import nodemailer from 'nodemailer';
import _ from 'lodash';

module.exports = ({ config}) => {

  let wholesaleApi = Router();

  /**
   * POST /whosale - send mail after clicking on the button 'Request an offer for large quantities'
   *   req.body.name - user name
   *   req.body.email - user email
   *   req.body.phone - user phone
   *   req.body.productName - product name for the request an offer for large quantities
   */
  wholesaleApi.post('/send', (req, res) => {

    const transport = config.extensions.wholesale.transport;
    // create reusable transport method (opens pool of SMTP connections)
    const smtpTransport = nodemailer.createTransport({
      host: transport.host,
      port: transport.port,
      secure: transport.secure, // true for 465, false for other ports
      auth: {
        user: transport.user, // generated ethereal user
        pass: transport.pass // generated ethereal password
      }
    });

    let compiled = _.template('The email of the person: <strong><%= email %></strong>.<br> ' +
        'The request of the person: <strong><%= sku %></strong>.<br>' +
        'Product Name: <strong><%= name %></strong>.<br>' +
        'Amount: <strong><%= amount %></strong>.<br>' +
        '<% if (comment) { %> Comment: <strong><%= comment %></strong>.<br> <% } %>');

    const text = compiled(Object.assign(req.query, req.body, { amount: req.body.amount || 1 }));

    // setup e-mail data with unicode symbols
    const mailOptions = {
      from: transport.from, // Email added to white list via AWS
      to: transport.to,
      subject: 'Quote from worldwidecomponents.com',
      text: text,
      html: text
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response) {
      apiStatus(res, error ? error : response, error ? 500 : 200);
      smtpTransport.close();
    });
  })

  return wholesaleApi
}
