var VvWork = VvWork || {};

/**
 * A writer which automatically writes to the given output stream with arbitrary
 * binary data, supplied as ArrayBuffers.
 * 
 * @constructor
 * @param {VvWork.OutputStream} stream The stream that data will be written
 *                                        to.
 */
VvWork.ArrayBufferWriter = function(stream) {

    /**
     * Reference to this VvWork.StringWriter.
     * @private
     */
    var guac_writer = this;

    // Simply call onack for acknowledgements
    stream.onack = function(status) {
        if (guac_writer.onack)
            guac_writer.onack(status);
    };

    /**
     * Encodes the given data as base64, sending it as a blob. The data must
     * be small enough to fit into a single blob instruction.
     * 
     * @private
     * @param {Uint8Array} bytes The data to send.
     */
    function __send_blob(bytes) {

        var binary = "";

        // Produce binary string from bytes in buffer
        for (var i=0; i<bytes.byteLength; i++)
            binary += String.fromCharCode(bytes[i]);

        // Send as base64
        stream.sendBlob(window.btoa(binary));

    }

    /**
     * Sends the given data.
     * 
     * @param {ArrayBuffer|TypedArray} data The data to send.
     */
    this.sendData = function(data) {

        var bytes = new Uint8Array(data);

        // If small enough to fit into single instruction, send as-is
        if (bytes.length <= 8064)
            __send_blob(bytes);

        // Otherwise, send as multiple instructions
        else {
            for (var offset=0; offset<bytes.length; offset += 8064)
                __send_blob(bytes.subarray(offset, offset + 8094));
        }

    };

    /**
     * Signals that no further text will be sent, effectively closing the
     * stream.
     */
    this.sendEnd = function() {
        stream.sendEnd();
    };

    /**
     * Fired for received data, if acknowledged by the server.
     * @event
     * @param {VvWork.Status} status The status of the operation.
     */
    this.onack = null;

};


/**
 * The default maximum blob length for new VvWork.ArrayBufferWriter
 * instances.
 *
 * @constant
 * @type {Number}
 */
VvWork.ArrayBufferWriter.DEFAULT_BLOB_LENGTH = 6048;
