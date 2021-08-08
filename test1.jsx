//@include "$include.jsx"


include("elements/button.jsx",
        "elements/treeitem.jsx",
        "elements/tab.jsx",
        "elements/*.jsx");

        
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