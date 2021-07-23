/*******************************************************************************
		Name:           $array
		Desc:           Some polyfills for the Array class.
		Path:           /utils/$array.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            forEach, indexOf, includes, remove, println
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//---
/******************************************************************************/

Array.prototype.forEach = function(callback, thisArg) {

    if (this == null) throw new TypeError('Array.prototype.forEach called on null or undefined');
    if (typeof callback !== "function") throw new TypeError(callback + ' is not a function');


    var T, k,
        O = Object(this);
        len = O.length >>> 0;
    if (arguments.length > 1) T = thisArg;
    k = 0;


    while (k < len) {

            var kValue;

            if (k in O) {

                    kValue = O[k];
                    callback.call(T, kValue, k, O);
            }
            k++;
    }


    return this;
};
Array.prototype.indexOf = function(el, fromIdx) {

    "use strict";
    if (this == null) throw new TypeError('"this" is null or not defined');


    var k,
        o = Object(this);
        len = o.length >>> 0,
        n = fromIdx | 0;


    if (len === 0) return -1;
    if (n >= len) return -1;

    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    for (; k < len; k++) {
            if (k in o && o[k] === el) return k;
    }


    return -1;
};
Array.prototype.remove = function(k, a) {

    if(typeof a != "boolean") a= false;


    var i = 0,
        len = this.length;

    
    while (i < len) {
            if (this[i] == k) {
                    this.splice(i, 1);
                    if(a) len--; else break;
            } else i++;
    }


    return this;
}
Array.prototype.println = function() {
    
    this.forEach(function(k) {
            $.writeln(k);
    });
}
Array.prototype.includes = function(k) {
    return this.indexOf(k) > -1;
}