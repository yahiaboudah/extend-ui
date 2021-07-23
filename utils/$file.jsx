/*******************************************************************************
		Name:           $file
		Desc:           Extend the prototype of the File/Folder classes in extendscript.
		Path:           /utils/$file.jsx
		Require:        String:checkFF, Array:indexOf, $:$sleep
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            $open, $close, $create, $write, $read, $clear, $seek,
                        $execute, $lines, $listenMod, $listenChar, $clearFolder.
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//@include "$$.jsx"
//@include "$array.jsx"
//@include "$string.jsx"
/******************************************************************************/

File.prototype.isOpen = false;
// Handler
File.prototype.$open = function(mode) {

        var cases = ["r", "w", "a", "e"];
        idx = cases.indexOf(mode);

        if (idx == -1) {
                if (this.fsName.checkFF()) with(this) {
                        open("e");
                        isOpen = true
                }
                else with(this) {
                        open("w");
                        isOpen = true
                };
                return this;
        } // throw Error("File open mode is invalid");

        this.open(cases[idx]);
        this.isOpen = true;
        return this;
}
// Handler
File.prototype.$close = function() {
        this.close();
        this.isOpen = false;
        return this;
}
// Handler
File.prototype.$write = function(txt, mode) {

        if (this.isOpen) this.write(txt);
        else this.$open(mode).write(txt);
        return this.$close();
}
// Handler
File.prototype.$read = function() {

        if (!this.exists) throw Error("Can't read a non-existent file!");
        
        var d = this.$open("r").read();
        this.$close();
        return d;
}
// Handler
File.prototype.$clear = function(txt) {
        
        if (typeof txt == "undefined") txt= ""; 
        
        this.$write(txt);

        return this;
}
// Handler
File.prototype.$seek = function(pos) {
        
        if (!this.isOpen) this.$open('r');
        
        this.seek(pos);
        
        return this;
}
// Handler
File.prototype.$create = function(text, encoding) {

    if(typeof encoding == "undefined") encoding = "UTF-8";
    if(typeof text == "undefined") text= "";

    this.encoding = encoding;
    this.$write(text, 'w');
    
    return this;
}
// Handler
File.prototype.$execute = function(slp, doClose) {
        if(typeof slp == "undefined") slp =0;

        this.execute();
        if(doClose) this.$close();
        
        $.sleep(slp);
        return this;
}
// Info
File.prototype.$lines = function() {

    var lines = [],
        line = "";

    this.$open("r");
    while (!this.eof) {
            line = this.readln();
            lines.push(line);
    }

    this.$close();
    return lines;
}
// Wait
File.prototype.$listenMod = function(debug, wait, maxiter, lmod) {

        function getWait(){
            defWait = 180;
            if (typeof wait == "undefined") return function(){ return defWait};
            if (wait == 'exp') return function(power){ return Math.pow(2, power)};
            else return function(){ return wait };
        }
        if (typeof lmod == "undefined") lmod = this.modified;
        if (typeof maxiter == "undefined") maxiter = 100;
        if (typeof debug == "undefined") debug = false;

        var iter = 0;
        while (iter < maxiter) {
                iter += 1;
                if (this.modified > lmod) break;
                $.$sleep(getWait()(iter+6), debug, iter);
        }

}
// Wait
File.prototype.$listenChar = function(charac, pos, wait, maxiter, debug) {

        if (typeof debug == "undefined") debug = false;
        if (typeof maxiter == "undefined") maxiter = 100;

        var iter = 0;
        while (iter < maxiter) {

                iter += 1;
                if (this.$open('r').$seek(pos).readch() == charac) break;
                else $.$sleep(wait, debug, iter);
        }
        
        this.$close();
}
File.prototype.$listen = function(delay, debug, patience, cleanup){

        if(typeof debug == "undefined")    debug    = false;
        if(typeof patience == "undefined") patience = 60000;

        var ttdelay = 0;

        while(1)
        {       
                if(this.exists)
                {
                        (!cleanup) || (this.remove());
                        break;
                }
                if(ttdelay > patience) break;
                $.$sleep(delay, debug, "Signal file not found. ");
                ttdelay += delay;
        }
}
// Folder Handler
Folder.prototype.$clearFolder = function(extensionName) {

    if (this.fsName.checkFF() != -1) throw Error("dirPath is not a folder path");
    var isAll = (typeof extensionName == "undefined")? true: false;

    var ffs = this.getFiles();

    ffs.forEach(function(f) {
            var ext = f.fsName.split('.');
            ext = ext[ext.length-1];
            if (f.constructor == File && (isAll || (ext == extensionName)) ) f.remove();
    })

    return 0;
}
Folder.prototype.$remove = function(){
        this.$clearFolder();
        this.remove();

        return 0;
}
File.remove = function(){
      args = Array.prototype.slice.call(arguments);
      for(var i=0, len = args.length; i< len; i++)
      {
        if(typeof args[i] == "undefined") continue;
        if(args[i].constructor == File) args[i].remove();
      }
}