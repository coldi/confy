const jsonQuery = require('json-query');

/**
 * Merges a leaf for a given key or executes a query in case the key begins with '$'.
 * @param key {string} The given key.
 * @param {Object} left The source object.
 * @param {Object|Function} right The object or function to merge.
 * @param {Function} merge The merge callback.
 * @returns {Object} The merged result.
 */
const mergeOrQuery = (key, left, right, merge) => {
    if (key.charAt(0) !== '$') {
        return {
            [key]: merge(left[key], right),
        };
    }

    const query = key.substring(1);

    const result = jsonQuery(query, {
        data: left,
        force: true,
    });

    // Get the references of all affected objects.
    const refs = Array.isArray(result.key) ? result.references[0] : result.references;

    /**
     * Instead of creating a new object, we replace the contents of the old object
     * with the new values. This way we can keep references of the existing configuration.
     * TODO: Find a way to use new objects and get rid of the delete() operator.
     */
    refs.forEach((obj) => {
        /* eslint-disable  no-param-reassign */

        // Remember the original keys from obj.
        // This way we don't remove anything when the object is returned by reference.
        const keys = Object.keys(obj);

        // Create a merged copy.
        const mergedObj = merge(obj, right);

        // ... and insert the new values.
        Object.keys(mergedObj).forEach((k) => { obj[k] = mergedObj[k]; });

        // Finally, remove all old keys not present in mergedObj anymore.
        keys.forEach((k) => {
            if (mergedObj[k] === undefined) {
                delete obj[k];
            }
        });

        /* eslint-enable  no-param-reassign */
    });

    return left;
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
