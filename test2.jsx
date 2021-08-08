


//@include "anothertest.jsx"

include("C:/projects/uijsx/elements/button.jsx",
        "C:/projects/uijsx/elements/treeitem.jsx",
        "C:/projects/uijsx/elements/tab.jsx");


$.writeln((new _Button({})).type); 
$.writeln((new _TreeItem({})).type);
$.writeln((new _Tab({})).type);