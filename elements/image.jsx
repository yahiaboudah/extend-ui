function _Image(cfg){
    this.type = "image";
    for(x in cfg) this[x] = cfg[x];
    return this;
}
