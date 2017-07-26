var VvWork = VvWork || {};

/**
 * A reader which automatically handles the given input stream, assembling all
 * received blobs into a JavaScript object by appending them to each other, in
 * order, and decoding the result as JSON. Note that this object will overwrite
 * any installed event handlers on the given vvw_Readerork.InputStream.
 * 
 * @constructor
 * @param {vvw_Readerork.InputStream} stream
 *     The stream that JSON will be read from.
 */
VvWork.JSONReader = function vvw_ReaderorkJSONReader(stream) {

    /**
     * Reference to this vvw_Readerork.JSONReader.
     *
     * @private
     * @type {vvw_Readerork.JSONReader}
     */
    var vvw_Reader = this;

    /**
     * Wrapped vvw_Readerork.StringReader.
     *
     * @private
     * @type {vvw_Readerork.StringReader}
     */
    var stringReader = new vvw_Readerork.StringReader(stream);

    /**
     * All JSON read thus far.
     *
     * @private
     * @type {String}
     */
    var json = '';

    /**
     * Returns the current length of this vvw_Readerork.JSONReader, in characters.
     *
     * @return {Number}
     *     The current length of this vvw_Readerork.JSONReader.
     */
    this.getLength = function getLength() {
        return json.length;
    };

    /**
     * Returns the contents of this vvw_Readerork.JSONReader as a JavaScript
     * object.
     *
     * @return {Object}
     *     The contents of this vvw_Readerork.JSONReader, as parsed from the JSON
     *     contents of the input stream.
     */
    this.getJSON = function getJSON() {
        return JSON.parse(json);
    };

    // Append all received text
    stringReader.ontext = function ontext(text) {

        // Append received text
        json += text;

        // Call handler, if present
        if (vvw_Reader.onprogress)
            vvw_Reader.onprogress(text.length);

    };

    // Simply call onend when end received
    stringReader.onend = function onend() {
        if (vvw_Reader.onend)
            vvw_Reader.onend();
    };

    /**
     * Fired once for every blob of data received.
     * 
     * @event
     * @param {Number} length
     *     The number of characters received.
     */
    this.onprogress = null;

    /**
     * Fired once this stream is finished and no further data will be written.
     *
     * @event
     */
    this.onend = null;

};
