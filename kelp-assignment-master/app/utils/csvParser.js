const fs = require('fs');
const readline = require('readline');

function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        const headers = [];
        const records = [];

        rl.on('line', (line) => {
            if (headers.length === 0) {
                headers.push(...line.split(','));
            } else {
                const values = line.split(',');
                const record = {};
                values.forEach((value, index) => {
                    const header = headers[index];
                    setNestedProperty(record, header, value);
                });
                records.push(record);
            }
        });

        rl.on('close', () => {
            resolve(records);
        });

        rl.on('error', (err) => {
            reject(err);
        });
    });
}

function setNestedProperty(obj, path, value) {
    const keys = path.split('.');
    let current = obj;

    while (keys.length > 1) {
        const key = keys.shift();
        if (!current[key]) {
            current[key] = {};
        }
        current = current[key];
    }

    current[keys[0]] = value;
}

module.exports = parseCSV;