const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: 'keys.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const authClientObject = async () => await auth.getClient();

const googleSheetsInstance = google.sheets({ version: 'v4', auth: authClientObject });

module.exports = { auth, googleSheetsInstance };
