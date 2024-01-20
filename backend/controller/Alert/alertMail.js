
const alertTemplate = require("../../utils/alertTemplate");



async function sendAlertEmail(req,res) {
	const [email,user,spoilagerate,days,warehouse]=req.body;

	
	try {
		
		const mailResponse = await mailSender(
			email,
			"Alert Email",
			alertTemplate(user,spoilagerate,days,warehouse)
		
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



