

function include(){
    args = Array.prototype.slice.call(arguments);
    for(var i=0, len = args.length; i< len; i++){
        currFile = args[i];
        $.evalFile(currFile);
    }
}