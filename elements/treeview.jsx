function _TreeView(cfg){
    this.type = "tree";
    for(x in cfg) this[x] = cfg[x];
    return this;
}