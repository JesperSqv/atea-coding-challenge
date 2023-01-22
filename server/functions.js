const getFloat = (number, array) => {
    var view = new DataView(new ArrayBuffer(4), 0);
    view.setUint16(0, array[number], true);
    view.setUint16(2, array[number+1], true);
    return view.getFloat32(0, true);
};

const getLong = (number, array) => {
    var view = new DataView(new ArrayBuffer(4), 0);
    view.setUint16(0, array[number], true);
    view.setUint16(2, array[number+1], true);
    return view.getInt32(0, true);
};

//high is 0 and low is 1
const getInt8 = (number, array, highOrLow) => {
    var view = new DataView(new ArrayBuffer(2), 0);
    view.setUint16(0, array[number], true);
    return view.getUint8(highOrLow, true);
};

module.exports = {
    getFloat,
    getLong,
    getInt8
};