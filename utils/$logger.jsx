/*******************************************************************************
		Name:           $logger
		Desc:           A simple logger for your extendscript scripts.
		Path:           /utils/$logger.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            debug, info, warning, error, critical
		Todo:           Create better formatting for messages.
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//---
/******************************************************************************/
($.global.hasOwnProperty("logger") || (function (host, self){
        
    host[self] = self;

    var inner     = {};
    inner.defPath = "C:/Projects/pyjsx/0LOGS";
    inner.levels  = 
    {
        NONSET: 0,
        DEBUG: 10,
        INFO: 20,
        WARNING: 30,
        ERROR: 40,
        CRITICAL: 50
    };
    inner.dttypes = {
        "FULL"    : "toString",
        "TIME"    : "toTimeString",
        "TIMEONLY": "toLocaleTimeString",
        "WEEKDAY" : "toLocaleString"
    }
    inner.fName   = function(args){
        return args.callee.toString().split(" ")[1].replace(/\(.*/, "");
    }
    inner.mkFile  = function(path, str){
        
        var ff = new File(path);
        
        ff.open('w'); ff.write(str);
        ff.close();

        return ff;
    }
    inner.writeMsg = function(str, mode){
        var ff = File(self.path);
        
        ff.open(mode); ff.write(str);
        
        ff.close();
        return 0;
    }
    inner.getMsg = function(msg, lvl, noww){
        return noww + ":" + lvl + ":" + msg;
    }
    inner.now    = function(){
        return new Date(Date.now())[inner.dttypes[self.dttype]]();
    }

    self.config = function(cfg){

        ( 'object' == typeof cfg ) || (cfg={});

        self.name  = cfg.name || $.stack.split("\n")[0];
        self.ext   = "/" + self.name + ".log";
        self.path  = (cfg.path)  || (inner.defPath + self.ext);
        
        self.level   = (cfg.level)    || 0;
        self.dttype  = (cfg.dttpye)   || "TIME";
        self.format  = cfg.format     || "*time:*level:*message";

        self.enabled = (cfg.enabled)  || true;
    }

    self.make = function(){ inner.mkFile(self.path, ""); }

    for (k in inner.levels){
        
        if(k == "NONSET") continue;
        self[k.toLowerCase()] = function(msg){
            
            var lvl = inner.fName(arguments).toUpperCase();
            var isBelow = (self.level <= inner.levels[lvl]);

            if(self.enabled && isBelow) inner.writeMsg(inner.getMsg(lvl, msg+"\n" , inner.now()) , "a");
        }
    }

}($.global, {toString: function(){ return "logger"}})));