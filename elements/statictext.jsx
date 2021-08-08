function _StaticText(cfg){
    this.type = "statictext";
    for(x in cfg) this[x] = cfg[x];
    return this;
}