var VvWork = VvWork || {};

/**
 * A reader which automatically handles the given input stream, assembling all
 * received blobs into a single blob by appending them to each other in order.
 * Note that this object will overwrite any installed event handlers on the
 * given VvWork.InputStream.
 * 
 * @constructor
 * @param {VvWork.InputStream} stream The stream that data will be read
 *                                       from.
 * @param {String} mimetype The mimetype of the blob being built.
 */
VvWork.BlobReader = function(stream, mimetype) {

    /**
     * Reference to this VvWork.InputStream.
     * @private
     */
    var guac_reader = this;

    /**
     * The length of this VvWork.InputStream in bytes.
     * @private
     */
    var length = 0;

    // Get blob builder
    var blob_builder;
    if      (window.BlobBuilder)       blob_builder = new BlobBuilder();
    else if (window.WebKitBlobBuilder) blob_builder = new WebKitBlobBuilder();
    else if (window.MozBlobBuilder)    blob_builder = new MozBlobBuilder();
    else
        blob_builder = new (function() {

            var blobs = [];

            /** @ignore */
            this.append = function(data) {
                blobs.push(new Blob([data], {"type": mimetype}));
            };

            /** @ignore */
            this.getBlob = function() {
                return new Blob(blobs, {"type": mimetype});
            };

        })();

    // Append received blobs
    stream.onblob = function(data) {

        // Convert to ArrayBuffer
        var binary = window.atob(data);
        var arrayBuffer = new ArrayBuffer(binary.length);
        var bufferView = new Uint8Array(arrayBuffer);

        for (var i=0; i<binary.length; i++)
            bufferView[i] = binary.charCodeAt(i);

        blob_builder.append(arrayBuffer);
        length += arrayBuffer.byteLength;

        // Call handler, if present
        if (guac_reader.onprogress)
            guac_reader.onprogress(arrayBuffer.byteLength);

        // Send success response
        stream.sendAck("OK", 0x0000);

    };

    // Simply call onend when end received
    stream.onend = function() {
        if (guac_reader.onend)
            guac_reader.onend();
    };

    /**
     * Returns the current length of this VvWork.InputStream, in bytes.
     * @return {Number} The current length of this VvWork.InputStream.
     */
    this.getLength = function() {
        return length;
    };

    /**
     * Returns the contents of this VvWork.BlobReader as a Blob.
     * @return {Blob} The contents of this VvWork.BlobReader.
     */
    this.getBlob = function() {
        return blob_builder.getBlob();
    };

    /**
     * Fired once for every blob of data received.
     * 
     * @event
     * @param {Number} length The number of bytes received.
     */
    this.onprogress = null;

    /**
     * Fired once this stream is finished and no further data will be written.
     * @event
     */
    this.onend = null;

};