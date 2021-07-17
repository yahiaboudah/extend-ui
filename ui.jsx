

// how it is:
function s(){
        var win = new Window("palette");
    var button1 = win.add("button");
    button1.text = "button1";
    button1.onClick = function(){
        text.text= "button 1 clicked";
    }

    var button2 = win.add("button");
    button2.text = "button2";
    button2.onClick = function(){
        text.text= "button2 clicked";
    }
    var text = win.add("statictext");
    text.text = "some shit to be said";
    win.show();
}

Array.prototype.remove = function(str){
    this.splice(this.indexOf(str), 1);
    return this;
}

var pp = function(root, cfg){
    
    if(!children || !root) return;

    children = cfg.children;
    
    for(var i=0,len = children.length; i<len; i++){
        
        child  = children[i]; 
        cns    = child.constructor.name;
        
        elName = cns; elName.shift(); elName = elName.toLowerCase();
        el = root.add(elName);
        
        if(el) //fill properties
        {
            // turn cfg to an array of keys:
            props = Object.keys(cfg).remove("children");
            for(var i=0, len = props.length;i< len;i++)
            {
                prop = props[i];
                el[prop] = cfg[prop];
            }
        }

        if(cns == ("$Group" || "$Panel")){
            g = root.add("group");
            pp(g, child.children);
            continue;
        }

    }
}

function $Button(cfg){
    this.text= cfg.text;
}

function $Label(cfg){
    this.text= cfg.text;
}

function $Group(cfg){
    this.children = cfg.children;
}

function $$Window(cfg){

    this.root = new Window("palette");
    this.root.text = cfg.text;
    pp(this.root, cfg);
    this.root.show();
}

function $MyCustomGroup(){

    return new $Group({
        children:[
            new $Button({
                text: "A group button 1"
            }),
            new $Label({
                text: "new group leabel right here"
            }),
            new $Button({
                text: "Well, Another group button for you"
            })
        ]
    })
}

(function(){
    w = new $$Window({
        text: "hello",
        children:[
            new $Button({
                text: "hello button"
            }),
            new $Label({
                text: "somelabel"
            }),
            new $MyCustomGroup()
        ]
    });
})();
