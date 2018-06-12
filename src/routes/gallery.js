const logDev = require("../logDev");
const express = require('express');
const router = express.Router();

let Gallery = require('../models/gallery');

const itemsPerPage = 30;

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
 * Executes find query.
 * @param {Object} query 
 * @param {Object} sort 
 * @param {number} page 
 * @param {(err: Error, result: any[]) => void} callback 
 */
function findInGallery(query, sort, page, callback) {
    Gallery.find(query)
        .sort(sort)
        .skip(page * itemsPerPage)
        .limit(itemsPerPage)
        .exec(callback);
}

/**
 * Builds a query object for finding entries.
 * @param {Object} query 
 */
function buildQuery(query) {
    let findQuery = {};

    if(query.type) findQuery.type = makeFilter(query.type);
    if(query.id) findQuery.id = makeFilter(query.id, true);
    if(query.c) findQuery.c = makeFilter(query.c);
    if(query.n) findQuery.n = makeFilter(query.n);
    if(query.p) findQuery.p = makeFilter(query.p);
    if(query.t) findQuery.t = makeFilter(query.t);
    if(query.g) findQuery.g = makeFilter(query.g);
    if(query.l) findQuery.l = makeFilter(query.l);
    if(query.a) findQuery.a = makeFilter(query.a);

    return findQuery;
}

/**
 * Returns an object for filtering data.
 * @param {any} val 
 * @param {Boolean} exact
 */
function makeFilter(val, exact = false) {
    if(!val)
        return undefined;
    if(exact)
        return val;
    return {$regex: new RegExp(val), $options: "i"};
}

router.get('/', (req, res) => {
    let query = req.query;
    let page = (query.page || 1) - 1;
    let findQuery = buildQuery(query);
    logDev(findQuery);

    findInGallery(findQuery, {id: -1}, page, (err, result) => {
        if(err) {
            console.log(`/gallery - Error: ${JSON.stringify(err)}`);
            res.send(getErrorResponse());
            return;
        }
        res.send(getSuccessResponse(result));
    });
});

module.exports = router;