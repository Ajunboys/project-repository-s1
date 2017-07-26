var VvWork = VvWork || {};

/**
 * Integer pool which returns consistently increasing integers while integers
 * are in use, and previously-used integers when possible.
 * @constructor 
 */
VvWork.IntegerPool = function() {

    /**
     * Reference to this integer pool.
     *
     * @private
     */
    var guac_pool = this;

    /**
     * Array of available integers.
     *
     * @private
     * @type {Number[]}
     */
    var pool = [];

    /**
     * The next integer to return if no more integers remain.
     * @type {Number}
     */
    this.next_int = 0;

    /**
     * Returns the next available integer in the pool. If possible, a previously
     * used integer will be returned.
     * 
     * @return {Number} The next available integer.
     */
    this.next = function() {

        // If free'd integers exist, return one of those
        if (pool.length > 0)
            return pool.shift();

        // Otherwise, return a new integer
        return guac_pool.next_int++;

    };

    /**
     * Frees the given integer, allowing it to be reused.
     * 
     * @param {Number} integer The integer to free.
     */
    this.free = function(integer) {
        pool.push(integer);
    };

};
