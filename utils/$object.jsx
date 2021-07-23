/*******************************************************************************
		Name:           $object
		Desc:           Some extensions and helper functions for Object class.
		Path:           /utils/$object.jsx
		Require:        Array: forEach, Arguments: paramCheck, File: $create/
                        $open/$write
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            Object.keys, Object.newKeys, Object.print, Object.write,
                        Object.stringify

		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//@include "$array.jsx"
//@include "$arguments.jsx"
//@include "$file.jsx"
//@include "$json.jsx"
/******************************************************************************/

Object.keys = (function () {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
            throw new TypeError('Object.keys called on non-object');
        }

        var result = [], prop, i;

        for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }

        if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
                if (hasOwnProperty.call(obj, dontEnums[i])) {
                    result.push(dontEnums[i]);
                }
            }
        }
        return result;
    };
}());
Object.newKeys = function(obj, keys, values){
    for(var i=0,len = keys.length; i< len; i++) obj[keys[i]] = values[i];
    return obj;
}
/*
* Get the size of an object: this is similar
* to Object.key(o).length, but more efficient.
*/
Object.size = function(o){
    var s = 0;
    for (ky in o) if (o.hasOwnProperty(ky)) s++;
    return s;
}
/**
 * dcKeys: deep compare keys. 
 * Compare the keys of two objects.
 * @returns {Boolean} true if matched.
*/
Object.dcKeys = function cKeys(a, b){

    if(typeof a != 'object' || typeof b != 'object') throw TypeError("bad arguments");

    if(Object.size(a) != Object.size(b)) return false;

    for (x in a){
        if(!a.hasOwnProperty(x)) continue;
        if(!b.hasOwnProperty(x)) return false; // also check for type?
        if(typeof a[x] == 'object')
        {
            if(typeof b[x] != 'object') return false;
            if (!cKeys(a[x], b[x])) return false;
        }
    }
    return true;
}
Object.validate = function(o, a){

    function type(v){

        if(arguments.length != 1) throw Error("pass 1 variable");
        if(v === undefined)       return 'undefined';
        if(v === null)            return 'undefined';
        if(typeof v == 'xml')     return 'xml';
        return v.constructor.name.toLowerCase();
    }

    if(type(o) != type(a))     return false; 
    if(type(o) == 'object')    return Object.dcKeys(o, a);
    if(type(o) == 'array')     return !(a<b || b<a);

    return (o == a);
}

Object.validateKeys = function(obj){
    var args = Array.prototype.slice.call(arguments,1);
    for(var i=0, len = args.length; i< len; i++)
    {
        if(typeof Object.getValue(obj, args[i]) == "undefined") return false;
    }
    return true;
}

/**
 * 
 * @param {Object} oo 
 * @param {String} pp: the path to the key ex: "path/to/key" is oo["path"]["to"]["key"] 
 * @param {Any} v: the new value: oo["path"]["to"]["key"] = v;
 */
Object.modify = function(oo, pp, v){

    var ks = pp.split("/"),
        seq= "oo",
        i  = 0,
        len= ks.length;

    for(; i<len; i++) seq += "[\"" + ks[i] + "\"]";
    
    eval(seq + "="  + JSON.stringifyy(v) + ";");
}
Object.getValue = function(oo, pp){
    
    var ks = pp.split("/"),
    seq= "oo",
    i  = 0,
    len= ks.length,
    myVal;

    for(; i<len; i++) seq += "[\"" + ks[i] + "\"]";

    eval("myVal = " + seq + ";");
    return myVal;
}
/**
 * 
 * Use the built in extendscript reflect object to get
 * an object's props val and keys or list of methods.
 * 
 * @param {Object} obj the object to inspect 
 * @param {String} info methods or properties 
 * @param {Boolean} obSrc if a val is an object, show the obj
 * @param {Boolean} cf create file and save info in it.
 * @returns {String} string with a list of info
 */
 Object.info = function( /*Object*/obj,/*String*/ info,
                                  /*Boolean*/exec, /*Boolean*/ objSrc, /*Boolean*/ cf) {
    
    
    var o = {
        prop: "properties",
        func: "methods",
        errMsg: "Can inspect properties or methods only! (prop/func)"
    }

    if (chk = Arguments.paramCheck(arguments, true)) throw Error(chk.errMsg);
    if (["prop", "func"].indexOf(info) < 0)          throw Error(o.errMsg);
    if (typeof obj == "undefined")                   throw Error("An undefined value was passed");
    if (typeof exec == "undefined")   exec   = false;
    if (typeof objSrc == "undefined") objSrc = false;
    if (typeof cr == "undefined")     cr     = false; 
    if (typeof info == "undefined")   info   = "prop";


    info = o[info];
    var props = obj.reflect[info];
        str   = "";


    if (info == o.prop) {
            props.forEach(function(prop) {
                    val = objSrc ? thiss[prop].toSource() : thiss[prop];
                    str += prop + " : " + uneval(val) + "\n";
            })
    }

    if (info === o.func) {
            props.forEach(function(prop) {
                    val = "";
                    if (exec) {
                            prop = prop.toString();
                            if (!prop.startsWith("set")) {
                                    eval("try {val = thiss." + prop + "();}" +
                                            "catch(e) { val = e; }");
                            }
                    }
                    str += (prop + " : " + (val));
            })
    }


    if (cf) new File($.fileName.replace(/\.[a-zA-Z]+/, ".info.txt")).$create(str);
    return str;
}

Object.print = function(obj, lvl, writeit) {

    if(typeof obj == "undefined") return "undefined";
    if(typeof lvl  == "undefined") lvl = Math.pow(2, 10);
    if(typeof noprint == "undefined") writeit = false;

    var str = "",
        hdr = "",
        max = 50;

    hdr = "["+obj.constructor.name+"]: w/len: " + Object.size(obj);
    str    = (frame(hdr, max) + Object.stringify(obj, lvl));


    if (writeit) $.writeln(str);
    return str;
}

Object.write = function(obj, fName, appnd) {

    var defaultWPath = Folder.desktop.fsName + "\\";

    if(typeof obj   == "undefined") throw Error("Type of obj is undefined");
    if(typeof appnd == "undefined") appnd = true;
    if(typeof fName == "undefined") fName = defaultWPath;


    var sName = $.stack.split("\n")[0].slice(1, -1),
        fName = (fName + sName).replace(/\.jsx/, ".md"),
        ff    = new File(fName),
        wr    = Object.print(obj, true, false);

    
    if (ff.exists && apnd) ff.$write(wr, 'a');
    else ff.$create(wr);
    return ff.fsName;
}