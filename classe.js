
/**
 * Class
 */
(function (root, factory) {
  
  if(typeof define === "function" && define.amd) { /*AMD*/ define(factory);
  } else if(typeof module === "object" && module.exports) { /*CommonsJS*/ module.exports = factory();
  } else { /*Browser globals*/ var module = factory(root);root[module.name] = module;}

})( this, function(root){

    var _class = function YourClassName(){
        //public property
        this.publicProperty = 'foo';
    };

    //private property
    var privateProperty = 'foo';
    
    //private method
    var privateMethod = function(){}
   
    //static property
    _class.prototype.staticProperty = 'foo';

    //public method
    _class.prototype.publicMethod = function(){}

    //public static property
    _class.staticProperty = 'foo';

    //constructor do not change
    _class.prototype.constructor = _class;
    return _class;
});


/**
 *  Singleton class
 */
(function (root, factory) {
  
  if(typeof define === "function" && define.amd) { /*AMD*/ define(factory);
  } else if(typeof module === "object" && module.exports) { /*CommonsJS*/ module.exports = factory();
  } else { /*Browser globals*/ var module = factory(root);root[module.className] = module; }

})( this, function(root){

    //Class definition part
     var _class = function YourSingletonClassName(){
        //public property
        this.publicProperty = 'foo';
    };

    //private property
    var privateProperty = 'foo';
    
    //private method
    var privateMethod = function(){}
   
    //static property
    _class.prototype.staticProperty = 'foo';

    //public method
    _class.prototype.publicMethod = function(){}

    //public static property
    _class.staticProperty = 'foo';

    //constructor do not change
    _class.prototype.constructor = _class;

    // Singleton part, do not touch
    var instance = null;
    var _singleton = function(){ throw new Error('This class is a Singleton and can not be instantiated, use getInstance() instead'); }
    _singleton = _singleton.prototype.constructor;
    _singleton.className = _class.name;
    _singleton.getInstance = function(){
            
            if(null === instance)
                instance = new _class();
          
            return instance; 
    };

     return _singleton;
 });

/**
 *  Simple singleton class
 */
(function (root, factory) {
  
  if(typeof define === "function" && define.amd) { /*AMD*/ define(factory);
  } else if(typeof module === "object" && module.exports) { /*CommonsJS*/ module.exports = factory();
  } else { /*Browser globals*/ root = factory(root); }

})( this, function(root){

    //private property
    var privateProperty = 'foo';
    
    //private method
    var privateMethod = function(){}

    return {
        //public property
        publicProperty:'foo',

        //public method
        publicMethod:function(){}
    };
});

