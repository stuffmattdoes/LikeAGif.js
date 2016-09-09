/*

    LikeAGif.js

    Description: Iterate through & activate DOM elements, kind of like a gif.
    Author: Matthew Morrison @stuffmattdoesnt
    License: MIT
    Twitter: @stuffmattdoesnt
    Version: 1.0

    TODO

*/

(function() {
     this.LikeAGif = function(container, params) {

        // ----------
        // Parameters
        // ----------

        var defaults = {
            containerActiveClass: 'active',
            containerCompleteClass: 'lag-container-complete',
            cycles: 0,
            direction : 'forward',
            frameStart : 0,
            interval: 1,
            item: 'lag-item',
            itemActiveClass: 'active',
            iterations: 0,
            speed: 500,
            timeout: 0,
            resetOnTimeout: false,
            resetOnStart: true
        }

        var lagInstance = this;
        var myInterval;
        var myTimeout;

        // Create options by extending defaults with the passed in arugments
        if (arguments[1] && typeof arguments[1] === "object") {
            this.options = extendDefaults(defaults, arguments[1]);
        }

        // Utility method to extend defaults with user options
        function extendDefaults(source, properties) {
            for (var property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }

        // --------------
        // Public Methods
        // --------------

        this.swapIt = function() {

            // console.log("Swap it!");

            // Variables
            var containerActiveClass = this.options.containerActiveClass,
                containerCompleteClass = this.options.containerCompleteClass,
                cycles = this.options.cycles,
                frameStart = this.options.frameStart,
                item = "." + this.options.item,
                itemActiveClass = this.options.itemActiveClass,
                iterations = this.options.iterations,
                speed = this.options.speed,
                timeout = this.options.timeout,
                resetOnStart = this.options.resetOnStart,
                interval = this.options.interval;

            var nextSwap,
                iterationCount = 0,
                cycleCount = 0;

            if (resetOnStart) {
                // console.log("Reset on start");
                lagInstance.reset();
                nextSwap = frameStart;
            } else {
                // Let's start our LikeAGif
                nextSwap = $(container).find(item + "." + itemActiveClass).index();
            }

            $(container).removeClass(containerCompleteClass);


            // -------------
            // Swap interval
            // -------------

            myInterval = window.setInterval(function() {
                $itemsLength = $(container).find($(item)).length - 1;
                $itemsLengthFull = $itemsLength + 1;
                nextSwap >= $itemsLength ? nextSwap %= $itemsLength : nextSwap += interval;

                if (nextSwap >= $itemsLength) {
                    cycleCount ++;
                }

                iterationCount ++;

                $(container).find($(item)).removeClass(itemActiveClass);
                $(container).find($(item)).eq(nextSwap).addClass(itemActiveClass);

                // Stop our LAG instance if it exceeds the specified iteration count
                if (iterations > 0
                    && iterationCount >= iterations) {

                    if (lagInstance.options.resetOnTimeout) {
                        // console.log("Iteration reset");
                        lagInstance.reset();
                    } else {
                        // console.log("Iterations complete");
                        clearInterval(myInterval);
                    }
                }

                // Stop our LAG instance if we've reached our max cycle count
                if (cycles > 0
                    && iterationCount >= cycles * $itemsLengthFull) {

                    if (lagInstance.options.resetOnTimeout) {
                        // console.log("Cycles reset");
                        lagInstance.reset();
                    } else {
                        // console.log("Cycles complete");
                        clearInterval(myInterval);
                    }
                }

            }, speed);

            // Set a time limit on our LikeAGif
            if (timeout > 0) {
                // console.log("Timeout init");

                myTimeout = window.setTimeout(function() {

                    if (lagInstance.options.resetOnTimeout) {
                        // console.log("Timeout reset");
                        lagInstance.reset();
                    } else {
                        // console.log("Timeout");
                        clearInterval(myInterval);
                    }

                }, timeout);
            }

        }

        // Reset our LAG instance to it's initial state
        this.reset = function() {
            // console.log("Reset");

            var containerActiveClass = this.options.containerActiveClass,
                containerCompleteClass = this.options.containerCompleteClass,
                frameStart = this.options.frameStart,
                item = this.options.item,
                itemActiveClass = this.options.itemActiveClass;

            clearInterval(myInterval);
            clearInterval(myTimeout);

            $(container).find($(item)).removeClass(itemActiveClass);
            $(container).find($(item)).eq(frameStart).addClass(itemActiveClass);
            $(container).addClass(containerCompleteClass);
        }

    }

})();
