/*

    LikeAGif.js

    Description: Iterate through multiple elements for a specified amount of time up until a set
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
            direction : 'forward',
            frameStart : 0,
            item: '.lag-item',
            itemActiveClass: 'active',
            speed: 500,
            steps: 1,
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
                item = this.options.item,
                itemActiveClass = this.options.itemActiveClass,
                speed = this.options.speed,
                timeout = this.options.timeout,
                resetOnStart = this.options.resetOnStart,
                steps = this.options.steps;

            var nextSwap;

            if (resetOnStart) {
                // console.log("Reset on start");
                lagInstance.reset();
                nextSwap = 0;
            } else {
                // Let's start our LikeAGif
                nextSwap = $(container).find(item + "." + itemActiveClass).index();
            }

            $(container).removeClass(containerCompleteClass);

            myInterval = window.setInterval(function() {
                $itemsLength = $(container).find($(item)).length - 1;
                nextSwap >= $itemsLength ? nextSwap %= $itemsLength : nextSwap += steps;

                $(container).find($(item)).removeClass(itemActiveClass);
                $(container).find($(item)).eq(nextSwap).addClass(itemActiveClass);
            }, speed);

            // // Set a time limit on our LikeAGif
            if (timeout > 0) {

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

        this.reset = function() {
            // console.log("Reset");

            var containerActiveClass = this.options.containerActiveClass,
                containerCompleteClass = this.options.containerCompleteClass,
                item = this.options.item,
                itemActiveClass = this.options.itemActiveClass;

            clearInterval(myInterval);
            clearInterval(myTimeout);

            $(container).find($(item)).removeClass(itemActiveClass);
            $(container).find($(item)).eq(0).addClass(itemActiveClass);
            $(container).addClass(containerCompleteClass);
        }

    }

})();
