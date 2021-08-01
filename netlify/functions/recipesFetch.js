const fetch = require('node-fetch');

const API_ID = process.env.REACT_APP_ID
const API_KEY = process.env.REACT_APP_KEY

exports.handler = async function(event, context) {
  try {
    const {query} = event.queryStringParameters || {};
    if (!query) {
      return { statusCode: 400, body: "Missing query parameters" };
    }

    let url = `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
    console.log(url)
    const response = await fetch(url);
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log("invocation error:", err); // output to netlify function log
    return {
      statusCode: 500,
      body: err.message // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};