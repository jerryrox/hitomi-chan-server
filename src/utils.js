/**
 * Returns whether specified id from params is valid as a gallery id.
 */
function isParamIdValid(id) {
    return id > 0 && !isNaN(id);
}

module.exports = {
    isParamIdValid
};