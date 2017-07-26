var VvWork = VvWork || {};

/**
 * Abstract stream which can receive data.
 * 
 * @constructor
 * @param {VvWork.Client} client The client owning this stream.
 * @param {Number} index The index of this stream.
 */
VvWork.OutputStream = function(client, index) {

    /**
     * Reference to this stream.
     * @private
     */
    var guac_stream = this;

    /**
     * The index of this stream.
     * @type {Number}
     */
    this.index = index;

    /**
     * Fired whenever an acknowledgement is received from the server, indicating
     * that a stream operation has completed, or an error has occurred.
     * 
     * @event
     * @param {VvWork.Status} status The status of the operation.
     */
    this.onack = null;

    /**
     * Writes the given base64-encoded data to this stream as a blob.
     * 
     * @param {String} data The base64-encoded data to send.
     */
    this.sendBlob = function(data) {
        client.sendBlob(guac_stream.index, data);
    };

    /**
     * Closes this stream.
     */
    this.sendEnd = function() {
        client.endStream(guac_stream.index);
    };

};
