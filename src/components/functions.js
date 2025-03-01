function concatValues(obj) {
    var value = "";
    for (var prop in obj) {
        value += obj[prop];
    }
    return value;
};

function cleanText(text) {
    const cleanedText = text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

    return cleanedText;
}

module.exports = { concatValues,cleanText };