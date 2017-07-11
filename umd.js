(function (root, factory) {
  
  if(typeof define === "function" && define.amd) {
    //AMD
    define(factory);
  } else if(typeof module === "object" && module.exports) {
    //CommonsJS
    module.exports = factory(root);
  } else {
    //Browser globals
    var module = factory(root);
    root[module.className] = module;
  }

}) (typeof window !== "undefined" ? window : this, function(root){
  
  //Code here

}));
