function _Button(cfg){
    this.type = "button";
    for(x in cfg) this[x] = cfg[x];
    return this;
}