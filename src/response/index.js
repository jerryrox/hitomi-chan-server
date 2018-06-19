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
 * Fail response preset: Invalid gallery id in params.
 */
function getInvalidGalleryIdResponse() {
    return getFailResponse("id must be an integer value!");
}

/**
 * Fail response preset: Error while query execution.
 */
function getQueryErrorResponse() {
    return getFailResponse("An error occured while executing query.");
}

/**
 * Returns a json object for successful response.
 */
function getSuccessResponse(data) {
    return {
        isSuccess: true,
        data: data
    };
}

/**
 * Response error preset: 404 not found
 */
function sendNotFoundResponse(res) {
    res.status(404).send();
}

module.exports = {
    getFailResponse,
    getInvalidGalleryIdResponse,
    getQueryErrorResponse,

    getSuccessResponse,

    sendNotFoundResponse,
};