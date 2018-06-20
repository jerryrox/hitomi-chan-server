const isDevLog = Boolean(process.env.DEV_MODE);

module.exports = function(message) {
    if(isDevLog)
        console.log(message);
}