

var myWindow = new Window( "dialog", "Alert Box Builder" ), g = myWindow.graphics;
var img = ScriptUI.newImage("C:/Users/me/Downloads/resizeicon.png", "C:/Users/me/Downloads/111x111 refresh.png");
img = myWindow.add ("image", undefined, img);
g.backgroundColor = g.newBrush( g.BrushType.SOLID_COLOR, [ 0.2, 0.1, 0.99, 1 ] );
img.addEventListener( "click", function(){
    alert("I was clicked");
} );
myWindow.show();