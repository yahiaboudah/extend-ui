/*******************************************************************************
		Name:           $include
		Desc:           better include functionality in extendscript
		Path:           /utils/$include.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            include(file), from(folder).
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
// ---
/******************************************************************************/

($.global.hasOwnProperty("inc")) || (function(host, self){
    
    //@include "$file.jsx"
    //@include "$string.jsx"
    host[self] = self;

    I = {};

    self.include = function(f){
        $.evalFile(f);
    }

}($.global, {toString: function(){return "inc"}}));