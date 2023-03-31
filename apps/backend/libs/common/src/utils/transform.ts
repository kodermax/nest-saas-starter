
function toLower(v) {
    return v.value.toLowerCase().trim();
}
function toDigits(v) {
    return v.value.replace(/\D/g, '');
}
function toTrim(v) {
    return v.value.trim();
}
function toDate(v) {
    return new Date(v.value);
}

function toCapitalize(v) {
    if (v['value']) {
        return v['value'][0].toUpperCase() + v['value'].slice(1).toLowerCase();
    }
    return '';
}

export const transform = {
    toCapitalize,
    toDate,
    toLower,
    toDigits,
    toTrim,
};
