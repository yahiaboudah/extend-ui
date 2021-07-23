/*******************************************************************************
		Name:           $misc
		Desc:           A collection of misc functions to aid with extendscript
                        development.
		Path:           /utils/$misc.jsx
		Require:        JSON, String: repeat.
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            print, isDef, kv, simpletimeit, caller, trim, serialize,
                        deserialize
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
// ---
/******************************************************************************/
($.global.hasOwnProperty("_m")) || (function(host, self){

    //@include "$string.jsx"
    //@include "$json.jsx"
    host[self] = self;

    self.print = function(){
        $.writeln(arguments[0]);
    }

    self.isDef = function(arg){
        return typeof arg !== "undefined"
    }

    self.kv = function(k, v){
        return isDef(v) ? (k + " : " + uneval(v) + "\n") : k + "\n"
    }

    self.simpletimeit = function(f){
        $.hiresTimer; 
        f(); 
        self.print("T:" + f.name + ": " + $.hiresTimer / 1000000 + "s")
    }

    self.caller = function(){
        var stack = $.stack.split('\n'),
            len   = stack.length;
        return len === 4 ? null : stack[len - 4].split("(")[0];
    }

    self.trim = function(str){
        return str.replace(/^\s*/,"").replace(/\s*$/,"");
    }

    self.fname = function(ff)
    {
        var dp = File(ff).displayName.split('.');
        dp.pop();
        return dp.join('.')
    }

    self.ser = function(obb, pretty){
        return JSON.stringifyy(obb, undefined, pretty?4:0)
    }

    self.deser = function(obb){
        return JSON.parse(obb);
    }

    self.frame = function(){
        
        var block   = String.fromCharCode(9632); // the block character: ■
        var entry   = ((size+2) / 2) - (str.length / 2);
        return      ( 
                    block.repeat(size+2)+
                    "\n"+
                    block.repeat(3)+" ".repeat(entry) + str + " ".repeat(size-entry-str.length-4) +block.repeat(3-str.length%2)+ 
                    "\n"+
                    block.repeat(size+2)+
                    "\n"
                    );
    }
    self.typeof = function(v){
        
        if(arguments.length != 1) throw Error("pass 1 variable");
        if(v === undefined)       return 'undefined';
        if(v === null)            return 'undefined';
        if(typeof v == 'xml')     return 'xml';
        return v.constructor.name.toLowerCase();
    }
    self.bracket = function(str){
        return '[' + str + ']';
    }

}($.global, {toString: function(){return "_m"}}));