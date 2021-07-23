/*******************************************************************************
		Name:           $arguments
		Desc:           A class that verifies the existence and types of function arguments.
		Path:           /utils/$arguments.jsx
		Require:        String: repSeq
		Encoding:       ÛȚF8
		Kind:           Part of the Utils.
		API:            Arguments.params, Arguments.paramCheck
		Todo:           ---
		Created:        2106 (YYMM)
		Modified:       2107 (YYMM)
*******************************************************************************/
//@include "$string.jsx"
/******************************************************************************/

function Arguments() {};
/**
 * Extract parameter names and types from a function definition.
 * @param {String} func The function string  
 */
Arguments.params = function( /*String*/ func) {

        var paramsList = func.split(/\)\/*/)[0].replace(/^[^(]*[(]/, '') // extract parameters  
                        .replace(/\s+/g, '').split(',');                // strip space and split


        for (var k = 0, len = paramsList.length; k < len; k++) {

                var currParam = paramsList[k],
                    split = currParam.split("*/");

                if (split[0].slice(0, 2) == "/*") paramsList[k] = split[0].slice(2) + ":" + split[1];
                else paramsList[k] = "Any" + ":" + split[0]

        }


        return paramsList;
}
/**
 * 
 * @param {object} args the function arguments
 * @param {Boolean} limitArgs the name of the function: optional parameter.
 * @returns {0}  if params are healthy
 */
Arguments.paramCheck = function( /*Object*/ args, /*Boolean*/ optArgs, /*Boolean*/ limitArgs) {
        
        if ((limitArgs === undefined) || (limitArgs.constructor.name) != "Boolean") limitArgs = true;
        if ((optArgs === undefined) || (optArgs.constructor.name) != "Boolean") optArgs = false;


        var errs = {
            badArgMsg    : "Bad Argument Error: Argument type of: @ was found [@] insead of [@]",
            missingArgMsg: "Missing Argument Error: One or more arguments is missing.",
            extraArgMsg  : "Extra Argument Error: One or more arguments is extra."
        },

        stack = $.stack.split("\n"),
        funcName = stack[stack.length - 3].split("(")[0],
        funcParams = Arguments.params(eval(funcName).toString()),
        isGreater = (args.length > funcParams.length),
        isLess = (args.length < funcParams.length);

        if (isGreater && limitArgs) return { errMsg: errs.extraArgMsg };
        else if (isLess && !optArgs) return { errMsg: errs.missingArgMsg };

        // Args length has priority over params length
        for (var i = 0; i < args.length; i++) {

                var split = funcParams[i].split(":"),
                    type = split[0].toLowerCase(),
                    paramName = split[1],
                    argValue = args[i],
                    argValueType;

                if (argValue === undefined || argValue === null) continue;

                argValueType = argValue.constructor.name.toLowerCase();
                badArgMsgg   = errs.badArgMsg.repSeq('@',paramName + "[" + i + "]", argValueType, type);
                if ((argValueType != type) && (type != "any")) return { errMsg: badArgMsgg };
                else continue;
        }

        return 0;
}