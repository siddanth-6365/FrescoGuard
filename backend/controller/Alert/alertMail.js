
const alertTemplate = require("../../utils/alertTemplate");
const mailSender = require("../../utils/mailSender");


async function sendAlertEmail(req,res) {
	const {email,user,spoilagerate,days,warehouses} = req.body;

	console.log(email,user,spoilagerate,days,warehouses);
	try {
		
		const mailResponse = await mailSender(
			email,
			"Alert Email",
			alertTemplate(user,spoilagerate,days,warehouses)
		
		);
		console.log("Email sent successfully: ", mailResponse.response);
		res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
		
	}
}
module.exports = {
	sendAlertEmail
  };



