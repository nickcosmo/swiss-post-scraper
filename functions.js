const { auth, googleSheetsInstance } = require('./google-init');

const spreadsheetId = process.env.SHEET_ID;

exports.getTrackingNums = async function getTrackingNums() {
    const trackingNums = [];
    try {
        const result = await googleSheetsInstance.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: 'Sheet1!A2:D14',
        });
        const allData = result.data.values;
        allData.forEach((line) => {
            trackingNums.push(line[0]);
        });
        return trackingNums;
    } catch (err) {
        console.log(err);
    }
};

exports.updateSheetData = async function updateSheetData(values) {
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
};
