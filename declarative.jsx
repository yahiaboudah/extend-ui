
// how it is:
var win = new Window("palette");
var button1 = win.add("button");
button1.text = "button1";
var button2 = win.add("button");
button2.text = "button2";
var text = win.add("statictext");
text.text = "some shit to be said";
win.show();

// how we want it:

function CustomButton(){}; extend(CustomButton, Button)
CustomButton.prototype.dance = function(){}

var win = new Window([
    new Button({
        text: "button1"
    }),
    new CustomButton({
        text: "dancebutton",
        dance: "wakawaka"
    }),
    new Button({
        text: "button2"
    }),
    new sText({
        text: "some shit to be said"
    })
]).show();


