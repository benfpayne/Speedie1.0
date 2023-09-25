import axios from 'axios';

export async function sendEmail(data: any, emailTemplateData: any) {
  const lambdaFunctionUrl =
    'https://3groc4xnncnwnfgvcuti3nuj7q0zuhem.lambda-url.ap-southeast-2.on.aws/';

  try {
    const customer = {
      Email: data.email,
      Make: data.selectedMake,
      Model: data.selectedModel,
      Description: data.selectedDescription,
      Time: getLocalTimestamp(),
      ...emailTemplateData
    };

    const response = await axios.post(lambdaFunctionUrl, customer);
    return response.status;
  } catch (error: any) {
    // nooo!
    console.error('Something went wrong innnit', error);

    // todo; store in sql that we have a failed email, new attribute
  }
}

function getLocalTimestamp(): string {
  const now = new Date();

  // Get individual components of the date and time
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Format the timestamp in your desired format
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return timestamp;
}
