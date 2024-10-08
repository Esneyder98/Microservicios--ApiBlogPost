function err(message, code, err) {
    let e = new Error(message);
    if(code){
        e.statusCode = code;
    }
    return e;
}

module.exports = err;