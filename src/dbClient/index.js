const Gallery = require('../models/gallery');
const logDev = require("../logDev");
const { addCondition } = require("./util");

/**
 * Builds a query object for searching entries.
 * @param {Object} query 
 */
function buildSearchQuery(query) {
    let docQuery;

    // If id is specified, it only returns a single result.
    if(query.id) {
        let condition = { id: query.id };
        docQuery = Gallery.findOne(condition);

        logDev(`buildQuery with condition: ${JSON.stringify(condition)}`);
    }
    else {
        let conditions = [];
        docQuery = Gallery.find({});

        addCondition(conditions, "type", query.type);
        addCondition(conditions, "c", query.c);
        addCondition(conditions, "n", query.n);
        addCondition(conditions, "p", query.p);
        addCondition(conditions, "t", query.t);
        addCondition(conditions, "g", query.g);
        addCondition(conditions, "l", query.l);
        addCondition(conditions, "a", query.a);
        if(conditions.length > 0)
            docQuery.and(conditions);

        logDev(`buildQuery with conditions: ${JSON.stringify(conditions)}`);
    }
    return docQuery;
}

/**
 * Attaches additional options to perform after query.
 */
function attachOptions(docQuery, sort, page, count) {
    docQuery.sort(sort)
        .skip(page * count)
        .limit(count);
}

/**
 * Executes specified query and returns result via callback.
 * Returns null data if unsuccessful.
 * @param {(data: any) => void}
 */
function executeQuery(docQuery, callback) {
    docQuery.exec((err, result) => {
        if(err) {
            console.log(`dbClient.executeQuery - Error: ${JSON.stringify(err)}`);
            callback(null);
            return;
        }
        callback(result);
    });
}

module.exports = {
    buildSearchQuery,
    attachOptions,
    executeQuery
};