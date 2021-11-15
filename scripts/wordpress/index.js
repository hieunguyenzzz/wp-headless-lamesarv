const fs = require('fs');
var getData = require('./getData');
var normalize = require('./cookData');
const getAllData = async () => {
    try {
        const raw = await getData();
        fs.writeFile('data/raw.json', JSON.stringify(raw, null, 2), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('data/raw.json writed!');
        });
        const data = await normalize(raw);
        fs.writeFile(
            'data/cookedData.json',
            JSON.stringify(data, null, 2),
            (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('data/cookedData.json writed!');
            }
        );
        return data;
    } catch (error) {
        console.error(error);
    }
};
getAllData();
