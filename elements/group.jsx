function _Group(cfg){
    this.type = "group";
    for(x in cfg) this[x] = cfg[x];
    return this;
}