const warehouse = require("../models/warehouse");


const alertTemplate = (user, spoilagerate,days,warehouse) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formal Letter to Warehouse Owner</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 20px;
            }
    
            .letter-container {
                max-width: 600px;
                margin: auto;
                text-align: justify;
            }
    
            .closing {
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="letter-container">
            <p>
            <img src="../utils/1.png">

                FrescoGaurd<br>

               
                Ghaziabad<br>
                abc@def<br>
                123456789<br>
                ${Date.now}
            </p>
    
            <p>
                ${user.name}<br>
                ${warehouse.name}<br>
                ${warehouse.location}<br>
               
            </p>
    
            <p><strong>Subject:</strong> Concerns Regarding Crop Safety in Your Warehouse</p>
    
            <p>
                Dear ${user.name},
            </p>
    
            <p>
                I hope this letter finds you well. I am writing to express my concerns regarding the current state of the crops stored in your warehouse. It has come to my attention that there may be potential risks to the quality and safety of the stored crops.
            </p>
    
            <p>
                [Explain the specific issues or risks that you have identified. Provide any relevant details about the conditions or circumstances that may pose a threat to the crops. It could be related to storage conditions, pest infestation, environmental factors, etc.]
            </p>
    
            <p>
                I understand the challenges that warehouse management may face, and I believe that addressing these concerns promptly is crucial to safeguarding the quality of the stored crops. I kindly request your immediate attention to this matter and would appreciate it if you could conduct a thorough inspection to mitigate any potential risks.
            </p>
    
            <p>
                If there are any additional details or information needed from my end, please do not hesitate to contact me at [Your Phone Number] or [Your Email Address]. I am open to collaboration and discussion to ensure the best possible outcome for all parties involved.
            </p>
    
            <p class="closing">
                Thank you for your prompt attention to this matter. I trust that you will take the necessary steps to address and resolve the concerns raised. I look forward to a positive resolution and appreciate your commitment to maintaining the quality of the stored crops.
            </p>
    
            <p>
                Sincerely,<br>
                FrescoGaurd Team
            </p>
        </div>
    </body>
    </html>
    `;
  };

module.exports = alertTemplate;