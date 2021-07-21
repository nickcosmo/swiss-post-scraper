const { google } = require('googleapis');
const { getUpdatedData } = require('./scraper');

require('dotenv').config();

const auth = new google.auth.GoogleAuth({
    keyFile: 'keys.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

const authClientObject = async () => await auth.getClient();

const googleSheetsInstance = google.sheets({ version: 'v4', auth: authClientObject });

const spreadsheetId = process.env.SHEET_ID;

const trackingNums = [];

async function sheetDataCall() {
    const result = await googleSheetsInstance.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Sheet1!A2:D14',
    });
    const allData = result.data.values;
    allData.forEach((line) => {
        trackingNums.push(line[0]);
    });
}

async function updateSheetData(values) {
    try {
        const result = await googleSheetsInstance.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: 'Sheet1!D2:F14',
            valueInputOption: 'USER_ENTERED',
            resource: values,
        });

        if (result) {
            console.log('success!');
        }
    } catch (err) {
        console.log(err);
    }
}

const updatedInfo = [];

sheetDataCall()
    .then(async () => {
        for (let i = 0; i < trackingNums.length; i++) {
            const returnData = await getUpdatedData(trackingNums[i]);
            updatedInfo.push(returnData);
        }
    })
    .then(() => {
        updateSheetData({ values: updatedInfo });
    });
