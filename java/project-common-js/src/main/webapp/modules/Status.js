var VvWork = VvWork || {};

/**
 * A VvWork status. Each VvWork status consists of a status code, defined
 * by the protocol, and an optional human-readable message, usually only
 * included for debugging convenience.
 *
 * @constructor
 * @param {Number} code
 *     The VvWork status code, as defined by VvWork.Status.Code.
 *
 * @param {String} [message]
 *     An optional human-readable message.
 */
VvWork.Status = function(code, message) {

    /**
     * Reference to this VvWork.Status.
     * @private
     */
    var guac_status = this;

    /**
     * The VvWork status code.
     * @see VvWork.Status.Code
     * @type {Number}
     */
    this.code = code;

    /**
     * An arbitrary human-readable message associated with this status, if any.
     * The human-readable message is not required, and is generally provided
     * for debugging purposes only. For user feedback, it is better to translate
     * the VvWork status code into a message.
     * 
     * @type {String}
     */
    this.message = message;

    /**
     * Returns whether this status represents an error.
     * @returns {Boolean} true if this status represents an error, false
     *                    otherwise.
     */
    this.isError = function() {
        return guac_status.code < 0 || guac_status.code > 0x00FF;
    };

};

/**
 * Enumeration of all VvWork status codes.
 */
VvWork.Status.Code = {

    /**
     * The operation succeeded.
     *
     * @type {Number}
     */
    "SUCCESS": 0x0000,

    /**
     * The requested operation is unsupported.
     *
     * @type {Number}
     */
    "UNSUPPORTED": 0x0100,

    /**
     * The operation could not be performed due to an internal failure.
     *
     * @type {Number}
     */
    "SERVER_ERROR": 0x0200,

    /**
     * The operation could not be performed as the server is busy.
     *
     * @type {Number}
     */
    "SERVER_BUSY": 0x0201,

    /**
     * The operation could not be performed because the upstream server is not
     * responding.
     *
     * @type {Number}
     */
    "UPSTREAM_TIMEOUT": 0x0202,

    /**
     * The operation was unsuccessful due to an error or otherwise unexpected
     * condition of the upstream server.
     *
     * @type {Number}
     */
    "UPSTREAM_ERROR": 0x0203,

    /**
     * The operation could not be performed as the requested resource does not
     * exist.
     *
     * @type {Number}
     */
    "RESOURCE_NOT_FOUND": 0x0204,

    /**
     * The operation could not be performed as the requested resource is
     * already in use.
     *
     * @type {Number}
     */
    "RESOURCE_CONFLICT": 0x0205,

    /**
     * The operation could not be performed because bad parameters were given.
     *
     * @type {Number}
     */
    "CLIENT_BAD_REQUEST": 0x0300,

    /**
     * Permission was denied to perform the operation, as the user is not yet
     * authorized (not yet logged in, for example).
     *
     * @type {Number}
     */
    "CLIENT_UNAUTHORIZED": 0x0301,

    /**
     * Permission was denied to perform the operation, and this permission will
     * not be granted even if the user is authorized.
     *
     * @type {Number}
     */
    "CLIENT_FORBIDDEN": 0x0303,

    /**
     * The client took too long to respond.
     *
     * @type {Number}
     */
    "CLIENT_TIMEOUT": 0x0308,

    /**
     * The client sent too much data.
     *
     * @type {Number}
     */
    "CLIENT_OVERRUN": 0x030D,

    /**
     * The client sent data of an unsupported or unexpected type.
     *
     * @type {Number}
     */
    "CLIENT_BAD_TYPE": 0x030F,

    /**
     * The operation failed because the current client is already using too
     * many resources.
     *
     * @type {Number}
     */
    "CLIENT_TOO_MANY": 0x031D

};
