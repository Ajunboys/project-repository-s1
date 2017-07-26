var VvWork = VvWork || {};

/**
 * A reader which automatically handles the given input stream, returning
 * strictly received packets as array buffers. Note that this object will
 * overwrite any installed event handlers on the given VvWork.InputStream.
 * 
 * @constructor
 * @param {VvWork.InputStream} stream The stream that data will be read
 *                                       from.
 */
VvWork.ArrayBufferReader = function(stream) {

    /**
     * Reference to this VvWork.InputStream.
     * @private
     */
    var guac_reader = this;

    // Receive blobs as array buffers
    stream.onblob = function(data) {

        // Convert to ArrayBuffer
        var binary = window.atob(data);
        var arrayBuffer = new ArrayBuffer(binary.length);
        var bufferView = new Uint8Array(arrayBuffer);

        for (var i=0; i<binary.length; i++)
            bufferView[i] = binary.charCodeAt(i);

        // Call handler, if present
        if (guac_reader.ondata)
            guac_reader.ondata(arrayBuffer);

    };

    // Simply call onend when end received
    stream.onend = function() {
        if (guac_reader.onend)
            guac_reader.onend();
    };

    /**
     * Fired once for every blob of data received.
     * 
     * @event
     * @param {ArrayBuffer} buffer The data packet received.
     */
    this.ondata = null;

    /**
     * Fired once this stream is finished and no further data will be written.
     * @event
     */
    this.onend = null;

};