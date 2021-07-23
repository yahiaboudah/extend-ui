
//@include "utils/$object.jsx"
//@include "utils/$array.jsx"

function _StaticText(cfg){
    this.type = "statictext";
    for(x in cfg) this[x] = cfg[x];
    return this;
}

function _Group(cfg){
    this.type = "group";
    for(x in cfg) this[x] = cfg[x];
    return this;
}

function _EditText(cfg){
    this.type = "edittext";
    for(x in cfg) this[x] = cfg[x];
    return this;
}

function _Image(cfg){
    this.type = "image";
    for(x in cfg) this[x] = cfg[x];
    return this;
}

function _IconButton(cfg){
    this.type = "image";
    for(x in cfg) this[x] = cfg[x];
    return this;
}

function _TreeView(cfg){
    this.type = "tree";
    for(x in cfg) this[x] = cfg[x];
    return this;
}

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
        child = children[k];
        this.win.add(child.type, undefined, child.text);
    }

    return this.win;
}

function _MyTextGroup(){
    return new _Group([
        new _StaticText({
            text: "Active Project"
        }),
        new _EditText({
            text: "editing text here"
        })
    ])
}

new _Window({
    type: "dialog",
    text: "Content Machine",
    width: 275,
    height: 224,
    orientation: "column",
    alignChildren: ["fill", "top"],
    spacing: 10,
    margins: 16,
    children:[
        new _MyTextGroup()
    ]
}).show();