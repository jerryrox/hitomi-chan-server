const logDev = require("../logDev");
const express = require('express');
const router = express.Router();

let Gallery = require('../models/gallery');

const minItemsPerPage = 1;
const defaultItemsPerPage = 30;
const maxItemsPerPage = 100;

/**
 * Returns the number of items to return on query result.
 * @returns {number}
 */
function getItemCount(count) {
    count = (count ? Number.parseInt(count) : defaultItemsPerPage);
    if(count < minItemsPerPage)
        return minItemsPerPage;
    else if(count > maxItemsPerPage)
        return maxItemsPerPage;
    return count;
}

function getErrorResponse() {
    return {
        success: false
    };
}

function getSuccessResponse(data) {
    return {
        success: true,
        data,
    };
}

/**
 * Builds a query object for finding entries.
 * @param {Object} query 
 */
function buildQuery(query) {
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
 * Adds a search condition object to specified array with val.
 * @param {Array} conditions
 * @param {string} key
 * @param {string} val
 */
function addCondition(conditions, key, val) {
    if(!val)
        return;
    
    // val is formatted as following:
    // URI_ENCODED_VALUE|URI_ENCODED_VALUE|...
    // The | character acts as the separator for each value.
    let encodedVals = val.split('|');
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

router.get('/', (req, res) => {
    let page = (req.query.page || 1) - 1;
    let count = getItemCount(req.query.count);

    var docQuery = buildQuery(req.query);
    attachOptions(docQuery, {id: -1}, page, count);

    docQuery.exec((err, result) => {
        if(err) {
            console.log(`/gallery - Error: ${JSON.stringify(err)}`);
            res.send(getErrorResponse());
            return;
        }
        res.send(getSuccessResponse(result));
    });
});

module.exports = router;