/**
 * Returns a json object for failed response.
 */
function getFailResponse(message = "") {
    return {
        isSuccess: false,
        error: message
    };
}

/**
 * Returns a json object for successful response.
 */
function getSuccessResponse(data) {
    return {
        isSuccess: true,
        ...data
    };
}

module.exports = {
    getFailResponse,
    getSuccessResponse
};