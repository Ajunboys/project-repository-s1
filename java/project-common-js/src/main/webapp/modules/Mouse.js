var VvWork = VvWork || {};

/**
 * Provides cross-browser mouse events for a given element. The events of
 * the given element are automatically populated with handlers that translate
 * mouse events into a non-browser-specific event provided by the
 * VvWork.Mouse instance.
 * 
 * @constructor
 * @param {Element} element The Element to use to provide mouse events.
 */
VvWork.Mouse = function(element) {

    /**
     * Reference to this VvWork.Mouse.
     * @private
     */
    var guac_mouse = this;

    /**
     * The number of mousemove events to require before re-enabling mouse
     * event handling after receiving a touch event.
     */
    this.touchMouseThreshold = 3;

    /**
     * The minimum amount of pixels scrolled required for a single scroll button
     * click.
     */
    this.scrollThreshold = 53;

    /**
     * The number of pixels to scroll per line.
     */
    this.PIXELS_PER_LINE = 18;

    /**
     * The number of pixels to scroll per page.
     */
    this.PIXELS_PER_PAGE = this.PIXELS_PER_LINE * 16;

    /**
     * The current mouse state. The properties of this state are updated when
     * mouse events fire. This state object is also passed in as a parameter to
     * the handler of any mouse events.
     * 
     * @type {VvWork.Mouse.State}
     */
    this.currentState = new VvWork.Mouse.State(
        0, 0, 
        false, false, false, false, false
    );
    
    this.getPosition = function(){
    	return {x:guac_mouse.currentState.x, y : guac_mouse.currentState.y};
    };

    /**
     * Fired whenever the user presses a mouse button down over the element
     * associated with this VvWork.Mouse.
     * 
     * @event
     * @param {VvWork.Mouse.State} state The current mouse state.
     */
	this.onmousedown = null;

    /**
     * Fired whenever the user releases a mouse button down over the element
     * associated with this VvWork.Mouse.
     * 
     * @event
     * @param {VvWork.Mouse.State} state The current mouse state.
     */
	this.onmouseup = null;

    /**
     * Fired whenever the user moves the mouse over the element associated with
     * this VvWork.Mouse.
     * 
     * @event
     * @param {VvWork.Mouse.State} state The current mouse state.
     */
	this.onmousemove = null;

    /**
     * Fired whenever the mouse leaves the boundaries of the element associated
     * with this VvWork.Mouse.
     * 
     * @event
     */
	this.onmouseout = null;

    /**
     * Counter of mouse events to ignore. This decremented by mousemove, and
     * while non-zero, mouse events will have no effect.
     * @private
     */
    var ignore_mouse = 0;

    /**
     * Cumulative scroll delta amount. This value is accumulated through scroll
     * events and results in scroll button clicks if it exceeds a certain
     * threshold.
     *
     * @private
     */
    var scroll_delta = 0;

    function cancelEvent(e) {
        e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.returnValue = false;
    }

    // Block context menu so right-click gets sent properly
    element.addEventListener("contextmenu", function(e) {
        cancelEvent(e);
    }, false);

    element.addEventListener("mousemove", function(e) {

        cancelEvent(e);

        // If ignoring events, decrement counter
        if (ignore_mouse) {
            ignore_mouse--;
            return;
        }

        guac_mouse.currentState.fromClientPosition(element, e.clientX, e.clientY);
               
        
        
        if (guac_mouse.onmousemove)
            guac_mouse.onmousemove(guac_mouse.currentState);

    }, false);

    element.addEventListener("mousedown", function(e) {

        cancelEvent(e);

        // Do not handle if ignoring events
        if (ignore_mouse)
            return;

        switch (e.button) {
            case 0:
                guac_mouse.currentState.left = true;
                break;
            case 1:
                guac_mouse.currentState.middle = true;
                break;
            case 2:
                guac_mouse.currentState.right = true;
                break;
        }

        if (guac_mouse.onmousedown)
            guac_mouse.onmousedown(guac_mouse.currentState);
       
    }, false);

    element.addEventListener("mouseup", function(e) {

        cancelEvent(e);

        // Do not handle if ignoring events
        if (ignore_mouse)
            return;

        switch (e.button) {
            case 0:
                guac_mouse.currentState.left = false;
                break;
            case 1:
                guac_mouse.currentState.middle = false;
                break;
            case 2:
                guac_mouse.currentState.right = false;
                break;
        }

        if (guac_mouse.onmouseup)
            guac_mouse.onmouseup(guac_mouse.currentState);
        
        var textInputLayer = document.getElementById("text-input");
        var heightPosition = e.clientY;
        var widthPosition  = e.clientX;
        if(window.innerHeight - heightPosition > 40)
            textInputLayer.style.top  = (heightPosition + 20) + "px";
        else
        	textInputLayer.style.top  = (heightPosition - 40) + "px";
        
        if(window.innerWidth - widthPosition > 40)
            textInputLayer.style.left  = (widthPosition + 20) + "px";
        else
        	textInputLayer.style.left  = (widthPosition - 40) + "px";
        
        
    }, false);

    element.addEventListener("mouseout", function(e) {

        // Get parent of the element the mouse pointer is leaving
       	if (!e) e = window.event;

        // Check that mouseout is due to actually LEAVING the element
        var target = e.relatedTarget || e.toElement;
        while (target) {
            if (target === element)
                return;
            target = target.parentNode;
        }

        cancelEvent(e);

        // Release all buttons
        if (guac_mouse.currentState.left
            || guac_mouse.currentState.middle
            || guac_mouse.currentState.right) {

            guac_mouse.currentState.left = false;
            guac_mouse.currentState.middle = false;
            guac_mouse.currentState.right = false;

            if (guac_mouse.onmouseup)
                guac_mouse.onmouseup(guac_mouse.currentState);
        }

        // Fire onmouseout event
        if (guac_mouse.onmouseout)
            guac_mouse.onmouseout();

    }, false);

    // Override selection on mouse event element.
    element.addEventListener("selectstart", function(e) {
        cancelEvent(e);
    }, false);

    // Ignore all pending mouse events when touch events are the apparent source
    function ignorePendingMouseEvents() { ignore_mouse = guac_mouse.touchMouseThreshold; }

    element.addEventListener("touchmove",  ignorePendingMouseEvents, false);
    element.addEventListener("touchstart", ignorePendingMouseEvents, false);
    element.addEventListener("touchend",   ignorePendingMouseEvents, false);

    // Scroll wheel support
    function mousewheel_handler(e) {

        // Determine approximate scroll amount (in pixels)
        var delta = e.deltaY || -e.wheelDeltaY || -e.wheelDelta;

        // If successfully retrieved scroll amount, convert to pixels if not
        // already in pixels
        if (delta) {

            // Convert to pixels if delta was lines
            if (e.deltaMode === 1)
                delta = e.deltaY * guac_mouse.PIXELS_PER_LINE;

            // Convert to pixels if delta was pages
            else if (e.deltaMode === 2)
                delta = e.deltaY * guac_mouse.PIXELS_PER_PAGE;

        }

        // Otherwise, assume legacy mousewheel event and line scrolling
        else
            delta = e.detail * guac_mouse.PIXELS_PER_LINE;
        
        // Update overall delta
        scroll_delta += delta;

        // Up
        if (scroll_delta <= -guac_mouse.scrollThreshold) {

            // Repeatedly click the up button until insufficient delta remains
            do {

                if (guac_mouse.onmousedown) {
                    guac_mouse.currentState.up = true;
                    guac_mouse.onmousedown(guac_mouse.currentState);
                }

                if (guac_mouse.onmouseup) {
                    guac_mouse.currentState.up = false;
                    guac_mouse.onmouseup(guac_mouse.currentState);
                }

                scroll_delta += guac_mouse.scrollThreshold;

            } while (scroll_delta <= -guac_mouse.scrollThreshold);

            // Reset delta
            scroll_delta = 0;

        }

        // Down
        if (scroll_delta >= guac_mouse.scrollThreshold) {

            // Repeatedly click the down button until insufficient delta remains
            do {

                if (guac_mouse.onmousedown) {
                    guac_mouse.currentState.down = true;
                    guac_mouse.onmousedown(guac_mouse.currentState);
                }

                if (guac_mouse.onmouseup) {
                    guac_mouse.currentState.down = false;
                    guac_mouse.onmouseup(guac_mouse.currentState);
                }

                scroll_delta -= guac_mouse.scrollThreshold;

            } while (scroll_delta >= guac_mouse.scrollThreshold);

            // Reset delta
            scroll_delta = 0;

        }

        cancelEvent(e);

    }

    element.addEventListener('DOMMouseScroll', mousewheel_handler, false);
    element.addEventListener('mousewheel',     mousewheel_handler, false);
    element.addEventListener('wheel',          mousewheel_handler, false);

    /**
     * Whether the browser supports CSS3 cursor styling, including hotspot
     * coordinates.
     *
     * @private
     * @type {Boolean}
     */
    var CSS3_CURSOR_SUPPORTED = (function() {

        var div = document.createElement("div");

        // If no cursor property at all, then no support
        if (!("cursor" in div.style))
            return false;

        try {
            // Apply simple 1x1 PNG
            div.style.cursor = "url(data:image/png;base64,"
                             + "iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB"
                             + "AQMAAAAl21bKAAAAA1BMVEX///+nxBvI"
                             + "AAAACklEQVQI12NgAAAAAgAB4iG8MwAA"
                             + "AABJRU5ErkJggg==) 0 0, auto";
        }
        catch (e) {
            return false;
        }

        // Verify cursor property is set to URL with hotspot
        return /\burl\([^()]*\)\s+0\s+0\b/.test(div.style.cursor || "");

    })();

    /**
     * Changes the local mouse cursor to the given canvas, having the given
     * hotspot coordinates. This affects styling of the element backing this
     * VvWork.Mouse only, and may fail depending on browser support for
     * setting the mouse cursor.
     * 
     * If setting the local cursor is desired, it is up to the implementation
     * to do something else, such as use the software cursor built into
     * VvWork.Display, if the local cursor cannot be set.
     *
     * @param {HTMLCanvasElement} canvas The cursor image.
     * @param {Number} x The X-coordinate of the cursor hotspot.
     * @param {Number} y The Y-coordinate of the cursor hotspot.
     * @return {Boolean} true if the cursor was successfully set, false if the
     *                   cursor could not be set for any reason.
     */
    this.setCursor = function(canvas, x, y) {

        // Attempt to set via CSS3 cursor styling
        if (CSS3_CURSOR_SUPPORTED) {
            var dataURL = canvas.toDataURL('image/png');
            element.style.cursor = "url(" + dataURL + ") " + x + " " + y + ", auto";
            return true;
        }

        // Otherwise, setting cursor failed
        return false;

    };

};

/**
 * Simple container for properties describing the state of a mouse.
 * 
 * @constructor
 * @param {Number} x The X position of the mouse pointer in pixels.
 * @param {Number} y The Y position of the mouse pointer in pixels.
 * @param {Boolean} left Whether the left mouse button is pressed. 
 * @param {Boolean} middle Whether the middle mouse button is pressed. 
 * @param {Boolean} right Whether the right mouse button is pressed. 
 * @param {Boolean} up Whether the up mouse button is pressed (the fourth
 *                     button, usually part of a scroll wheel). 
 * @param {Boolean} down Whether the down mouse button is pressed (the fifth
 *                       button, usually part of a scroll wheel). 
 */
VvWork.Mouse.State = function(x, y, left, middle, right, up, down) {

    /**
     * Reference to this VvWork.Mouse.State.
     * @private
     */
    var guac_state = this;

    /**
     * The current X position of the mouse pointer.
     * @type {Number}
     */
    this.x = x;

    /**
     * The current Y position of the mouse pointer.
     * @type {Number}
     */
    this.y = y;

    /**
     * Whether the left mouse button is currently pressed.
     * @type {Boolean}
     */
    this.left = left;

    /**
     * Whether the middle mouse button is currently pressed.
     * @type {Boolean}
     */
    this.middle = middle;

    /**
     * Whether the right mouse button is currently pressed.
     * @type {Boolean}
     */
    this.right = right;

    /**
     * Whether the up mouse button is currently pressed. This is the fourth
     * mouse button, associated with upward scrolling of the mouse scroll
     * wheel.
     * @type {Boolean}
     */
    this.up = up;

    /**
     * Whether the down mouse button is currently pressed. This is the fifth 
     * mouse button, associated with downward scrolling of the mouse scroll
     * wheel.
     * @type {Boolean}
     */
    this.down = down;

    /**
     * Updates the position represented within this state object by the given
     * element and clientX/clientY coordinates (commonly available within event
     * objects). Position is translated from clientX/clientY (relative to
     * viewport) to element-relative coordinates.
     * 
     * @param {Element} element The element the coordinates should be relative
     *                          to.
     * @param {Number} clientX The X coordinate to translate, viewport-relative.
     * @param {Number} clientY The Y coordinate to translate, viewport-relative.
     */
    this.fromClientPosition = function(element, clientX, clientY) {
    
        guac_state.x = clientX - element.offsetLeft;
        guac_state.y = clientY - element.offsetTop;

        // This is all JUST so we can get the mouse position within the element
        var parent = element.offsetParent;
        while (parent && !(parent === document.body)) {
            guac_state.x -= parent.offsetLeft - parent.scrollLeft;
            guac_state.y -= parent.offsetTop  - parent.scrollTop;

            parent = parent.offsetParent;
        }

        // Element ultimately depends on positioning within document body,
        // take document scroll into account. 
        if (parent) {
            var documentScrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            var documentScrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            guac_state.x -= parent.offsetLeft - documentScrollLeft;
            guac_state.y -= parent.offsetTop  - documentScrollTop;
        }

    };
    
    this.toClientPosition = function(element){
    	var clientX = 0;
    	var clientY = 0;
    	

        // This is all JUST so we can get the mouse position within the element
        var parent = element.offsetParent;
        while (parent && !(parent === document.body)) {
            guac_state.x += parent.offsetLeft + parent.scrollLeft;
            guac_state.y += parent.offsetTop  + parent.scrollTop;

            parent = parent.offsetParent;
        }
        
        // Element ultimately depends on positioning within document body,
        // take document scroll into account. 
        if (parent) {
            var documentScrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
            var documentScrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            guac_state.x += parent.offsetLeft + documentScrollLeft;
            guac_state.y += parent.offsetTop  + documentScrollTop;
        }
        
       
        
        clientX = guac_state.x + element.offsetLeft;
    	clientX = guac_state.y + element.offsetTop;
    	return {x:clientX, y: clientY};
    };

};

