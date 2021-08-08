/*******************************************************************************
		Name:           $string
		Desc:           String polyfills.
		Path:           /utils/$string.jsx
		Require:        Array: indexOf, Object: Object.newKeys, File:$read
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            inspectFF, startsWith, repeat, padding, checkFF, replaceSeq,
                        capFirst, jump.
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//@include "$array.jsx"
/******************************************************************************/

/**
 * Inspect a path string.
 * @returns {Object} returns an inspection object:{
        valid      : x,
        folderDepth: x,
        drive      : x,
        isFile     : x,
        isFolder   : x,
        extension  : x
    }
 */
 String.prototype.inspectFF = function() {

    var inspection = {},
        parts = this.split('/'),
        lastPart = parts.pop(),
        numParts = parts.length,
        fStr0 = this[0],
        fStr1 = this[1];

    inspection.folderDepth = numParts;
    inspection.drive = (fStr1 == ':') ? fStr0 : null;
    inspection.isFile = false;
    inspection.isFolder = false;
    inspection.extension = "";

    /**
     * if last part contains a dot: file
     * if not: check numParts: if 0: invalid path string
     * if numParts > 0: folder
     */

    if (lastPart.indexOf('.') > -1) 
            Object.newKeys(inspection,["valid", "isFile", "isFolder","extension"],
                                      [true,true,false,lastPart.split('.').pop()]);

    else Object.newKeys(inspection, ["valid", "isFolder"], [!!numParts, !!numParts]);


    return inspection;
}
String.prototype.startsWith = function(search, rawPos) {

    var pos = rawPos > 0 ? rawPos | 0 : 0;
    
    return this.substring(pos, pos + search.length) === search;
}
String.prototype.repeat = function(n) {
    
    var rep = this.toString(),
        str = "",
        c   = 0;
    
    while ((c < n) && ++c) str += rep;

    return str;
}
String.prototype.padding = function() {
    var pad = /^\s*/;

    pad.exec(this);
    
    return pad.lastIndex;
}
/**
* 
* @returns {Number} -1 if Folder, 1 if File, 0 if it does not exist
*/
String.prototype.checkFF = function() {

    var ff = Folder(this);

    if (!ff.exists) return 0;
    return (ff.constructor == File)? 1: -1;
}
/**
* Replace the special character with the argument strings (one at a time)
* @returns {String} the final string with all replacements:
*/
String.prototype.replaceSeq = function(specialChar/*, str1, str2..*/) {

    startIdx = 1;
    if (typeof specialChar == "undefined"){
        specialChar = '@';
        startIdx    =  0;  
    }

    var thiss = this, 
        args  = Array.prototype.slice.call(arguments, startIdx),
        patt  = new RegExp(specialChar),    
        i     = 0;
    
    while (thiss.search(patt) != -1) thiss = thiss.replace(patt, args[i++] || specialChar);


    return thiss;
}
String.prototype.title = function() {
    return this[0].toUpperCase() + this.slice(1);
}
String.prototype.jumpit = function(str) {
    return this.split(';').join(';' + "\n ");
}
String.validate = function(str, against){
    return false;
    if('undefined' == typeof str)     throw Error('no string to validate');
    if('undefined' == typeof against) throw Error('against arg is undefined');
    if(against.constructor == File){
        against.open('r');
        str = against.read(); against.close();
    }

    return (str == against);
}