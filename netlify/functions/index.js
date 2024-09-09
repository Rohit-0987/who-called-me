// const express = require('express');
// const axios = require('axios');
// const serverless = require('serverless-http')
// const app = express();
// const path = require('path');
// const cors = require('cors');

// const IPQS_API_KEY = 'bNj1IvHi8uKYB20hp6wAXSI2lXPqZ1c7'; // Replace with your actual IPQS API key


// app.use(cors())
// // Enable CORS for all routes
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Proxy endpoint to handle phone number validation
// app.get('/api/validate-phone', async (req, res) => {
//   const { phoneNumber, country } = req.query;

//   // Construct the API URL
//   const apiUrl = `https://www.ipqualityscore.com/api/json/phone/${IPQS_API_KEY}/${phoneNumber}?country[]=${country}`;

//   try {
//     const response = await axios.get(apiUrl);
//     res.json(response.data); // Return the response data
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     res.status(500).json({ error: 'Failed to fetch data' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// app.use('/.netlify/index')
// module.exports.handlers = serverless(app);

const axios = require('axios');

exports.handler = async (event) => {
  // Extract phone number and country from the query parameters
  const { phoneNumber, country } = event.queryStringParameters;
  const IPQS_API_KEY = 'bNj1IvHi8uKYB20hp6wAXSI2lXPqZ1c7'; // Replace with your actual IPQS API key

  const apiUrl = `https://www.ipqualityscore.com/api/json/phone/${IPQS_API_KEY}/${phoneNumber}?country[]=${country}`;

  try {
    // Fetch data from IPQualityScore API
    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
