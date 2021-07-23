
// ================         LEXSER       ================================
// ======================================================================
/**
 * A bunch of functions I decided to use at first but ought for simple
 * regex instead of building a simple js compiler for python.
*/

function kwType(k){
    
    types = {

        // main reserved keywords:
        "def"   : "FUNCTION",
        "class" : "CLASS",
        "except": "EXCEPT",
        "pass"  : "PASS",
        "with"  : "WITH",
        "return": "RETURN",
        "from"  : "IMPORT",
        "import": "IMPORT",
        "for"   : "LOOP",
        "while" : "LOOP",
        "if"    : "CONDITIONAL",
        "elif"  : "CONDITIONAL",

        // additional keywords:
        "print" : "OPERATION:print"
    }
    // deal with "deal:": 
    if(k.match(/else\s*\:\s*/)) return "CONDITIONAL";
    if(k.match(/try\s*\:\s*/)) return "TRY";
    if(k.match(/except\s*\:\s*/)) return "EXCEPT";
    if(k[0] == "#") return "COMMENT";
    if( k= types[k]) return k;

    // if none of the above: return operation:
    return "OPERATION";
}
function getNameAndArgs(pll){
    // GET THE FUNC NAME:
    funcName = pll.split(" ", 2)[1].replace(/(\s*)(\()(.+)/, "");//getName

    //========= ARGS:
    // DEAL WITH ARGS
    //get args:
    argss    = pll.split("(")[1].replace(/((\s*)(\))(\s*)(\:)(\s*))$/,"").split(",");
    
    // just deal with args! fingers crossed:
    for(var i=0, len = argss.length; i<len; i++)
    {
            newargss = argss[i].split("=");

            if(newargss.length == 1)
            {
                argss[i] = {
                    name: trim(newargss[0]),
                    def : undefined
                }
            }

            if(newargss.length == 2)
            {
                argss[i] = {
                            name: trim(newargss[0]),
                            def: trim(newargss[1])
                            }
            }       
    }
    //FINSHED DEALING WITH ARGS

    return {
            name:  funcName,
            args:  argss
    }
}
function identify(ll){

    //cleanup:
    ll  = trim(ll);
    iKw = ll.split("(")[0].split(" ")[0]; //initial keyword
    iKwt  = kwType(iKw); // initial keyword type

    //if function or class:
    if(["FUNCTION","CLASS"].includes(iKwt))
    {
        nameAndArgs = getNameAndArgs(ll);
        
        return {
            type:  iKwt,
            name:  nameAndArgs.name,
            args:  nameAndArgs.args
        }
    }

    return {
        type: iKwt,
        name: '',
        args: ''
    }

}
function pyLines(lines){
        
        var parsedLines = [],
        i        = 1,
        curr     = lines[0],
        len = lines.length + i;

        for(; i<len;i++)
        { 
            next = lines[i];
            if(!next) next = ""; 
            
            if(curr === "")
            {
                curr = next; 
                continue;
            }
            
            pad = curr.padding();
            idtt= identify(curr);
            parsedLines.push(
                {
                    contents: curr,
                    padding : pad,
                    level   : (pad / 4) + 1,
                    isScope : (pad < next.padding()),
                    type    : idtt.type,
                    name    : idtt.name,
                    args    : idtt.args,
                    number  : i
                }
            );
            curr = next;
        }

        parsedLines.unshift({
                contents: "",
                padding : -1,
                level   : 0,
                isScope : true,
                number  : 0
        });

        return parsedLines;
}
function collapse(allLines, maxLvl){

    var glob = {
        
        parentLevel     : 0,
        maxLevel        : (typeof maxLvl == "undefined")? 1: maxLvl,
        simple_collapse : function(slines, pLevel){
            
            var i =0, len = slines.length, k;

            while(i<len){
        
                    k = i + 1;
                    
                    if(k == len) break; // don't like this
                    
                    if(slines[k].level == pLevel)
                    {
                        i++;
                        continue;
                    }
                    
                    slines[i].children = [];
                    
                    while( slines[k].level != pLevel )
                    { 
                        newLine = {
                            contents: slines[k].contents,
                            level   : slines[k].level,
                            type    : slines[k].type,
                            name    : slines[k].name,
                            args    : slines[k].args,
                        }
                        slines[i].children.push(newLine);
                        k++;
                        if(k == len) break; //don't like this
                    }
        
                    slines.splice(i+1, k-i-1); 
                    len = slines.length; 
                    i++;
            }
            return slines;
        }
    };
    
    function collapse_wrapped(lines){

        lines = glob.simple_collapse(lines, glob.parentLevel);

        glob.parentLevel++;
        if(glob.parentLevel <= glob.maxLevel)
        {
            for(var i=0, len = lines.length; i< len; i++){

                if(lines[i].children)
                { 
                    collapse_wrapped(lines[i].children);
                    glob.parentLevel--;
                }
            }
        }
    } collapse_wrapped(allLines);
    return allLines;
}
function availableFunctions(chd){

    var avFunctions = [];
    
    // now filter functions out:
    var len       = chd.length,
        i         = 0;
    
    while(i < len)
    {
        child = chd[i];
        if(child.type == "FUNCTION")
        {   
            var allFuncArgs = [];
            child.args.forEach(function(arg){
                allFuncArgs.push(arg.name);
            });
            
            avFunctions.push({
                funcName : child.name,
                args : allFuncArgs,
            });
        }
        i++;
    }

    return avFunctions;
}