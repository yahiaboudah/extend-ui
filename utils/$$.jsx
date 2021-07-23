/*******************************************************************************
		Name:           $$
		Desc:           An extension to extendscript's $ functions.
		Path:           /utils/$$.jsx
		Require:        ---
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            $sleep
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//---
/******************************************************************************/
$.$sleep = function(slept, deb, appn){

    if(typeof slept == "undefined") return;
    if(typeof appn == "undefined") appn = "";
    else appn = appn.toSource() + ": ";
    if(typeof deb == "undefined") deb = false;


    if(deb) $.writeln(appn  + "Sleeping for " + slept + " ms.." )
    $.sleep(slept);


    return 0;
}