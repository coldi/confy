const jsonQuery = require('json-query');
const Immutable = require('seamless-immutable'); // eslint-disable-line

/* eslint-disable  no-trailing-spaces */
/**
 * TODO: Find a way to solve this, if possible.
 * This file shows a prototype of how merge with queries could work
 * in an immutable way. Unfortunately, if we implement it like this,
 * the following example fails:
 *
       addons: {
            '$eslint.extends': (paths) => ([
                ...paths,
                'newPath',
            ]),

            // Anything returned from query fn above will be ignored / overwritten!
            eslint: { ... },
        },
 *
 */
/* eslint-enable  no-trailing-spaces */

/**
 * Reconstructs the path of a query result by iterating over
 * `result.parents` and returns an Array with keys.
 * @param {Object} result A jsonQuery result
 * @returns {Array} A path as an Array of keys.
 */
const reconstructPathByQueryResult = (result) => {
    const parents = result.parents.concat({ key: result.key });

    return parents.reduce((arr, parent) => {
        const { key } = parent;

        if (typeof key === 'string') {
            return arr.concat([key]);
        }

        if (Array.isArray(key)) {
            return arr.concat([key[0]]);
        }

        return arr;
    }, []);
};

/**
 * Merges a leaf for a given key or executes a query in case the key begins with '$'.
 * @param key {string} The given key.
 * @param {Object} left The source object.
 * @param {Object|Function} right The object or function to merge.
 * @param {Function} merge The merge callback.
 * @returns {Object} The merged result.
 */
const mergeOrQuery = (key, left, right, merge) => {
    if (key[0] === '$') {
        const query = key.substring(1);

        const result = jsonQuery(query, {
            data: left,
            force: true,
        });

        const path = reconstructPathByQueryResult(result);

        const mergedResult = merge(result.value, right);

        return Immutable.setIn(left, path, mergedResult);
    }

    return {
        [key]: merge(left[key], right),
    };
};

/**
 * Creates a new merged object.
 * Object keys of right can be functions that receive the
 * equivalent value of the given key in left or undefined if the key
 * does not exist in left.
 * @param {Object} left The source object.
 * @param {Object|Function} right The object or function to merge.
 * @returns {Object} The merged result.
 */
const merge = (left, right) => {
    if (
        // If left or right side is primitive ...
        (typeof left !== 'object' || Array.isArray(left) || typeof right !== 'object') &&
        // and right side is not a function.
        typeof right !== 'function'
    ) {
        // Return right side if defined, else the original value.
        return right !== undefined ? right : left;
    }

    if (typeof right === 'function') {
        return right(left);
    }

    // Recursively create the object.
    const diff = Object.keys(right).reduce((acc, key) => ({
        ...acc,
        ...mergeOrQuery(key, left, right[key], merge),
    }), {});

    return {
        ...left,
        ...diff,
    };
};

module.exports = merge;
