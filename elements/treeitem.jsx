function _TreeItem(cfg){
    this.type = "treeitem";
    for(x in cfg) this[x] = cfg[x];
    return this;
}