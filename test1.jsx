
//@include "utils/$object.jsx"
//@include "utils/$array.jsx"

function _Window(cfg){
    
    this.win  = new Window(cfg.type);
    var props = Object.keys(cfg).remove("children").remove("type");
    
    for(var i=0, len= props.length; i< len; i++)
    {
        this.win[props[i]] = cfg[props[i]];
    }
    
    this.win.preferredSize.width = cfg.width || 100;
    this.win.preferredSize.height = cfg.height || 50;

    if(typeof cfg.children == "undefined") return this.win;

    children = cfg.children;
    for(var k=0, klen= children.length; k< klen; k++)
    {
        this.win.add(children[k]);
    }

    return this.win;
}

new _Window({
    type: "dialog",
    text: "Content Machine",
    width: 275,
    height: 224,
    orientation: "column",
    alignChildren: ["fill", "top"],
    spacing: 10,
    margins: 16
}).show();