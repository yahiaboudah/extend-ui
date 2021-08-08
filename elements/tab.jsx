function _Tab(cfg){
    this.type = "tab";
    for(x in cfg) this[x] = cfg[x];
    return this;
}