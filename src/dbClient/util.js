/**
 * Adds a search condition object to specified array with val.
 * @param {Array} conditions
 * @param {string} key
 * @param {string} val
 */
function addCondition(conditions, key, val) {
    if(!val)
        return;
    
    // val is formatted as following:
    // URI_ENCODED_VALUE,URI_ENCODED_VALUE,...
    // The , character acts as the separator for each value.
    let encodedVals = val.split(',');
    if(!encodedVals || encodedVals.length === 0)
        return;
    
    let searchObjects = encodedVals.map(encodedVal => {
        return {
            [key]: {
                $regex: new RegExp(decodeURIComponent(encodedVal)),
                $options: "i"
            }
        };
    });
    searchObjects.forEach(obj => {
        conditions.push(obj);
    });
}

module.exports = {
    addCondition
};