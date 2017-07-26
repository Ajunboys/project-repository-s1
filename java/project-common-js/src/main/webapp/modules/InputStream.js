var VvWork = VvWork || {};

/**
 * An input stream abstraction used by the VvWork client to facilitate
 * transfer of files or other binary data.
 * 
 * @constructor
 * @param {VvWork.Client} client The client owning this stream.
 * @param {Number} index The index of this stream.
 */
VvWork.InputStream = function(client, index) {

    /**
     * Reference to this stream.
     * @private
     */
    var vvw_stream = this;

    /**
     * The index of this stream.
     * @type {Number}
     */
    this.index = index;

    /**
     * Called when a blob of data is received.
     * 
     * @event
     * @param {String} data The received base64 data.
     */
    this.onblob = null;

    /**
     * Called when this stream is closed.
     * 
     * @event
     */
    this.onend = null;

    /**
     * Acknowledges the receipt of a blob.
     * 
     * @param {String} message A human-readable message describing the error
     *                         or status.
     * @param {Number} code The error code, if any, or 0 for success.
     */
    this.sendAck = function(message, code) {
        client.sendAck(vvw_stream.index, message, code);
    };

};
