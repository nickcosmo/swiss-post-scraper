require('dotenv').config();
const { getUpdatedData } = require('./scraper');
const functions = require('./functions');

(async () => {
    const updatedShipData = [];

    const trackingNums = await functions.getTrackingNums();

    for (let i = 0; i < trackingNums.length; i++) {
        const returnData = await getUpdatedData(trackingNums[i]);
        updatedShipData.push(returnData);
    }

    await functions.updateSheetData({ values: updatedShipData });
})();
