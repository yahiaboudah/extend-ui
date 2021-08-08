
function _EditText(cfg){
    this.type = "edittext";
    for(x in cfg) this[x] = cfg[x];
    return this;
}