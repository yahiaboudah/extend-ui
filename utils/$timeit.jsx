/*******************************************************************************
		Name:           $timeit
		Desc:           A simple timeit class to measure the exec time of funcs.
        Credit:         Marc Aurtret.
		Path:           /utils/$timeit.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            Timeit.time, Timeit.compare
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//---
/******************************************************************************/
delete($.global["timeit"]);
($.global.hasOwnProperty("timeit") || (function (host, self){

    host[self] = self;

    self.time = function (/*func*/f, /*int*/n /*,arg1,arg2,...*/){

        if(typeof f == "undefined") throw Error("No function to time.")
        if(typeof n == "undefined") n =1;


        var args =  Array.prototype.slice.call(arguments, 2),
            t  = 0, 
            tt = 0,
            i  = n,
            mics = 1000000;
    

        while(i--){
            $.hiresTimer;
            f.apply(null, args);
            t   = $.hiresTimer;
            tt += t;
        }
    

        args.length = 0;
        args = null;
        return {
            func: f.name,
            numPasses: n    ,
            time    : ((tt/n)/mics)
        };
    }
    self.compare = function(f1, f2 , n/*, arg1, arg2*/)
    {
        if(typeof f1 == "undefined" || typeof f2 == "undefined") throw Error("No functions passed to compare.");
        if(typeof n  == "undefined") n = 1;


        var args =  Array.prototype.slice.call(arguments, 3),
            t1 = Timeit.time.apply(null, [n, f1].concat(args)).time,
            t2 = Timeit.time.apply(null, [n, f2].concat(args)).time;
        
            
        args.length = 0;
        args = null;
        return {
            func1    :f1.name,
            t1       : t1,
            func2    :f2.name,
            t2       : t2,
            numPasses: n,
            ratio    : .1 * ~~(10*(t1/t2))
        };
    }
}($.global, {"toString": function(){return "timeit"}})))