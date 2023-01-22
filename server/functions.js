const getFloat = (number, array) => {
    var view = new DataView(new ArrayBuffer(4), 0);
    view.setUint16(0, array[number], true);
    view.setUint16(2, array[number+1], true);
    return view.getFloat32(0, true);
};

module.exports = {
    getFloat
};