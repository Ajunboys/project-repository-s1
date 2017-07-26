var VvWork = VvWork || {};

/**
 * Maintains a singleton instance of the Web Audio API AudioContext class,
 * instantiating the AudioContext only in response to the first call to
 * getAudioContext(), and only if no existing AudioContext instance has been
 * provided via the singleton property. Subsequent calls to getAudioContext()
 * will return the same instance.
 *
 * @namespace
 */
VvWork.AudioContextFactory = {

    /**
     * A singleton instance of a Web Audio API AudioContext object, or null if
     * no instance has yes been created. This property may be manually set if
     * you wish to supply your own AudioContext instance, but care must be
     * taken to do so as early as possible. Assignments to this property will
     * not retroactively affect the value returned by previous calls to
     * getAudioContext().
     *
     * @type {AudioContext}
     */
    'singleton' : null,

    /**
     * Returns a singleton instance of a Web Audio API AudioContext object.
     *
     * @return {AudioContext}
     *     A singleton instance of a Web Audio API AudioContext object, or null
     *     if the Web Audio API is not supported.
     */
    'getAudioContext' : function getAudioContext() {

        // Fallback to Webkit-specific AudioContext implementation
        var AudioContext = window.AudioContext || window.webkitAudioContext;

        // Get new AudioContext instance if Web Audio API is supported
        if (AudioContext) {
            try {

                // Create new instance if none yet exists
                if (!VvWork.AudioContextFactory.singleton)
                    VvWork.AudioContextFactory.singleton = new AudioContext();

                // Return singleton instance
                return VvWork.AudioContextFactory.singleton;

            }
            catch (e) {
                // Do not use Web Audio API if not allowed by browser
            }
        }

        // Web Audio API not supported
        return null;

    }

};
