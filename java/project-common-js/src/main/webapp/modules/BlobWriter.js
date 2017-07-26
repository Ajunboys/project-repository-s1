var VvWork = VvWork || {};

/**
 * A writer which automatically writes to the given output stream with the
 * contents of provided Blob objects.
 *
 * @constructor
 * @param {VvWork.OutputStream} stream
 *     The stream that data will be written to.
 */
VvWork.BlobWriter = function BlobWriter(stream) {

    /**
     * Reference to this VvWork.BlobWriter.
     *
     * @private
     * @type {VvWork.BlobWriter}
     */
    var guacWriter = this;

    /**
     * Wrapped VvWork.ArrayBufferWriter which will be used to send any
     * provided file data.
     *
     * @private
     * @type {VvWork.ArrayBufferWriter}
     */
    var arrayBufferWriter = new VvWork.ArrayBufferWriter(stream);

    // Initially, simply call onack for acknowledgements
    arrayBufferWriter.onack = function(status) {
        if (guacWriter.onack)
            guacWriter.onack(status);
    };

    /**
     * Browser-independent implementation of Blob.slice() which uses an end
     * offset to determine the span of the resulting slice, rather than a
     * length.
     *
     * @private
     * @param {Blob} blob
     *     The Blob to slice.
     *
     * @param {Number} start
     *     The starting offset of the slice, in bytes, inclusive.
     *
     * @param {Number} end
     *     The ending offset of the slice, in bytes, exclusive.
     *
     * @returns {Blob}
     *     A Blob containing the data within the given Blob starting at
     *     <code>start</code> and ending at <code>end - 1</code>.
     */
    var slice = function slice(blob, start, end) {

        // Use prefixed implementations if necessary
        var sliceImplementation = (
                blob.slice
             || blob.webkitSlice
             || blob.mozSlice
        ).bind(blob);

        var length = end - start;

        // The old Blob.slice() was length-based (not end-based). Try the
        // length version first, if the two calls are not equivalent.
        if (length !== end) {

            // If the result of the slice() call matches the expected length,
            // trust that result. It must be correct.
            var sliceResult = sliceImplementation(start, length);
            if (sliceResult.size === length)
                return sliceResult;

        }

        // Otherwise, use the most-recent standard: end-based slice()
        return sliceImplementation(start, end);

    };

    /**
     * Sends the contents of the given blob over the underlying stream.
     *
     * @param {Blob} blob
     *     The blob to send.
     */
    this.sendBlob = function sendBlob(blob) {

        var offset = 0;
        var reader = new FileReader();

        /**
         * Reads the next chunk of the blob provided to
         * [sendBlob()]{@link VvWork.BlobWriter#sendBlob}. The chunk itself
         * is read asynchronously, and will not be available until
         * reader.onload fires.
         *
         * @private
         */
        var readNextChunk = function readNextChunk() {

            // If no further chunks remain, inform of completion and stop
            if (offset >= blob.size) {

                // Fire completion event for completed blob
                if (guacWriter.oncomplete)
                    guacWriter.oncomplete(blob);

                // No further chunks to read
                return;

            }

            // Obtain reference to next chunk as a new blob
            var chunk = slice(blob, offset, offset + arrayBufferWriter.blobLength);
            offset += arrayBufferWriter.blobLength;

            // Attempt to read the blob contents represented by the blob into
            // a new array buffer
            reader.readAsArrayBuffer(chunk);

        };

        // Send each chunk over the stream, continue reading the next chunk
        reader.onload = function chunkLoadComplete() {

            // Send the successfully-read chunk
            arrayBufferWriter.sendData(reader.result);

            // Continue sending more chunks after the latest chunk is
            // acknowledged
            arrayBufferWriter.onack = function sendMoreChunks(status) {

                if (guacWriter.onack)
                    guacWriter.onack(status);

                // Abort transfer if an error occurs
                if (status.isError())
                    return;

                // Inform of blob upload progress via progress events
                if (guacWriter.onprogress)
                    guacWriter.onprogress(blob, offset - arrayBufferWriter.blobLength);

                // Queue the next chunk for reading
                readNextChunk();

            };

        };

        // If an error prevents further reading, inform of error and stop
        reader.onerror = function chunkLoadFailed() {

            // Fire error event, including the context of the error
            if (guacWriter.onerror)
                guacWriter.onerror(blob, offset, reader.error);

        };

        // Begin reading the first chunk
        readNextChunk();

    };

    /**
     * Signals that no further text will be sent, effectively closing the
     * stream.
     */
    this.sendEnd = function sendEnd() {
        arrayBufferWriter.sendEnd();
    };

    /**
     * Fired for received data, if acknowledged by the server.
     *
     * @event
     * @param {VvWork.Status} status
     *     The status of the operation.
     */
    this.onack = null;

    /**
     * Fired when an error occurs reading a blob passed to
     * [sendBlob()]{@link VvWork.BlobWriter#sendBlob}. The transfer for the
     * the given blob will cease, but the stream will remain open.
     *
     * @event
     * @param {Blob} blob
     *     The blob that was being read when the error occurred.
     *
     * @param {Number} offset
     *     The offset of the failed read attempt within the blob, in bytes.
     *
     * @param {DOMError} error
     *     The error that occurred.
     */
    this.onerror = null;

    /**
     * Fired for each successfully-read chunk of data as a blob is being sent
     * via [sendBlob()]{@link VvWork.BlobWriter#sendBlob}.
     *
     * @event
     * @param {Blob} blob
     *     The blob that is being read.
     *
     * @param {Number} offset
     *     The offset of the read that just succeeded.
     */
    this.onprogress = null;

    /**
     * Fired when a blob passed to
     * [sendBlob()]{@link VvWork.BlobWriter#sendBlob} has finished being
     * sent.
     *
     * @event
     * @param {Blob} blob
     *     The blob that was sent.
     */
    this.oncomplete = null;

};