var VvWork = VvWork || {};

/**
 * Abstract video player which accepts, queues and plays back arbitrary video
 * data. It is up to implementations of this class to provide some means of
 * handling a provided VvWork.InputStream and rendering the received data to
 * the provided VvWork.Display.VisibleLayer. Data received along the
 * provided stream is to be played back immediately.
 *
 * @constructor
 */
VvWork.VideoPlayer = function VideoPlayer() {

    /**
     * Notifies this VvWork.VideoPlayer that all video up to the current
     * point in time has been given via the underlying stream, and that any
     * difference in time between queued video data and the current time can be
     * considered latency.
     */
    this.sync = function sync() {
        // Default implementation - do nothing
    };

};

/**
 * Determines whether the given mimetype is supported by any built-in
 * implementation of VvWork.VideoPlayer, and thus will be properly handled
 * by VvWork.VideoPlayer.getInstance().
 *
 * @param {String} mimetype
 *     The mimetype to check.
 *
 * @returns {Boolean}
 *     true if the given mimetype is supported by any built-in
 *     VvWork.VideoPlayer, false otherwise.
 */
VvWork.VideoPlayer.isSupportedType = function isSupportedType(mimetype) {

    // There are currently no built-in video players (and therefore no
    // supported types)
    return false;

};

/**
 * Returns a list of all mimetypes supported by any built-in
 * VvWork.VideoPlayer, in rough order of priority. Beware that only the core
 * mimetypes themselves will be listed. Any mimetype parameters, even required
 * ones, will not be included in the list.
 *
 * @returns {String[]}
 *     A list of all mimetypes supported by any built-in VvWork.VideoPlayer,
 *     excluding any parameters.
 */
VvWork.VideoPlayer.getSupportedTypes = function getSupportedTypes() {

    // There are currently no built-in video players (and therefore no
    // supported types)
    return [];

};

/**
 * Returns an instance of VvWork.VideoPlayer providing support for the given
 * video format. If support for the given video format is not available, null
 * is returned.
 *
 * @param {VvWork.InputStream} stream
 *     The VvWork.InputStream to read video data from.
 *
 * @param {VvWork.Display.VisibleLayer} layer
 *     The destination layer in which this VvWork.VideoPlayer should play
 *     the received video data.
 *
 * @param {String} mimetype
 *     The mimetype of the video data in the provided stream.
 *
 * @return {VvWork.VideoPlayer}
 *     A VvWork.VideoPlayer instance supporting the given mimetype and
 *     reading from the given stream, or null if support for the given mimetype
 *     is absent.
 */
VvWork.VideoPlayer.getInstance = function getInstance(stream, layer, mimetype) {

    // There are currently no built-in video players
    return null;

};
