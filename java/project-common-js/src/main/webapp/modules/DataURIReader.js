var VvWork = VvWork || {};

/**
 * A reader which automatically handles the given input stream, returning
 * received blobs as a single data URI built over the course of the stream.
 * Note that this object will overwrite any installed event handlers on the
 * given VvWork.InputStream.
 * 
 * @constructor
 * @param {VvWork.InputStream} stream
 *     The stream that data will be read from.
 */
VvWork.DataURIReader = function(stream, mimetype) {

    /**
     * Reference to this VvWork.DataURIReader.
     * @private
     */
    var guac_reader = this;

    /**
     * Current data URI.
     *
     * @private
     * @type {String}
     */
    var uri = 'data:' + mimetype + ';base64,';

    // Receive blobs as array buffers
    stream.onblob = function dataURIReaderBlob(data) {

        // Currently assuming data will ALWAYS be safe to simply append. This
        // will not be true if the received base64 data encodes a number of
        // bytes that isn't a multiple of three (as base64 expands in a ratio
        // of exactly 3:4).
        uri += data;

    };

    // Simply call onend when end received
    stream.onend = function dataURIReaderEnd() {
        if (guac_reader.onend)
            guac_reader.onend();
    };

    /**
     * Returns the data URI of all data received through the underlying stream
     * thus far.
     *
     * @returns {String}
     *     The data URI of all data received through the underlying stream thus
     *     far.
     */
    this.getURI = function getURI() {
        return uri;
    };

    /**
     * Fired once this stream is finished and no further data will be written.
     *
     * @event
     */
    this.onend = null;

};