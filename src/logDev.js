const isDevLog = process.env.LOG_DEV;

module.exports = function(message) {
    if(isDevLog)
        console.log(message);
}