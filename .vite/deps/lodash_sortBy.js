import {
  require_baseEach
} from "./chunk-LMLJIJJF.js";
import {
  require_arrayMap,
  require_baseGet,
  require_baseIteratee,
  require_identity,
  require_isSymbol
} from "./chunk-DZQ2WRJD.js";
import {
  require_defineProperty
} from "./chunk-LGSBE47T.js";
import {
  require_arrayPush,
  require_eq,
  require_isIndex
} from "./chunk-CJRBCH5K.js";
import {
  require_Symbol,
  require_baseUnary,
  require_isArguments,
  require_isArray,
  require_isArrayLike,
  require_isObject
} from "./chunk-EUM3NQ5V.js";
import {
  __commonJS
} from "./chunk-WXXH56N5.js";

// node_modules/lodash/_isFlattenable.js
var require_isFlattenable = __commonJS({
  "node_modules/lodash/_isFlattenable.js"(exports, module) {
    var Symbol = require_Symbol();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : void 0;
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }
    module.exports = isFlattenable;
  }
});

// node_modules/lodash/_baseFlatten.js
var require_baseFlatten = __commonJS({
  "node_modules/lodash/_baseFlatten.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isFlattenable = require_isFlattenable();
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1, length = array.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    module.exports = baseFlatten;
  }
});

// node_modules/lodash/_baseMap.js
var require_baseMap = __commonJS({
  "node_modules/lodash/_baseMap.js"(exports, module) {
    var baseEach = require_baseEach();
    var isArrayLike = require_isArrayLike();
    function baseMap(collection, iteratee) {
      var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value, key, collection2) {
        result[++index] = iteratee(value, key, collection2);
      });
      return result;
    }
    module.exports = baseMap;
  }
});

// node_modules/lodash/_baseSortBy.js
var require_baseSortBy = __commonJS({
  "node_modules/lodash/_baseSortBy.js"(exports, module) {
    function baseSortBy(array, comparer) {
      var length = array.length;
      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }
    module.exports = baseSortBy;
  }
});

// node_modules/lodash/_compareAscending.js
var require_compareAscending = __commonJS({
  "node_modules/lodash/_compareAscending.js"(exports, module) {
    var isSymbol = require_isSymbol();
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
        var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
        if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
          return 1;
        }
        if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }
    module.exports = compareAscending;
  }
});

// node_modules/lodash/_compareMultiple.js
var require_compareMultiple = __commonJS({
  "node_modules/lodash/_compareMultiple.js"(exports, module) {
    var compareAscending = require_compareAscending();
    function compareMultiple(object, other, orders) {
      var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
      while (++index < length) {
        var result = compareAscending(objCriteria[index], othCriteria[index]);
        if (result) {
          if (index >= ordersLength) {
            return result;
          }
          var order = orders[index];
          return result * (order == "desc" ? -1 : 1);
        }
      }
      return object.index - other.index;
    }
    module.exports = compareMultiple;
  }
});

// node_modules/lodash/_baseOrderBy.js
var require_baseOrderBy = __commonJS({
  "node_modules/lodash/_baseOrderBy.js"(exports, module) {
    var arrayMap = require_arrayMap();
    var baseGet = require_baseGet();
    var baseIteratee = require_baseIteratee();
    var baseMap = require_baseMap();
    var baseSortBy = require_baseSortBy();
    var baseUnary = require_baseUnary();
    var compareMultiple = require_compareMultiple();
    var identity = require_identity();
    var isArray = require_isArray();
    function baseOrderBy(collection, iteratees, orders) {
      if (iteratees.length) {
        iteratees = arrayMap(iteratees, function(iteratee) {
          if (isArray(iteratee)) {
            return function(value) {
              return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
            };
          }
          return iteratee;
        });
      } else {
        iteratees = [identity];
      }
      var index = -1;
      iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
      var result = baseMap(collection, function(value, key, collection2) {
        var criteria = arrayMap(iteratees, function(iteratee) {
          return iteratee(value);
        });
        return { "criteria": criteria, "index": ++index, "value": value };
      });
      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }
    module.exports = baseOrderBy;
  }
});

// node_modules/lodash/_apply.js
var require_apply = __commonJS({
  "node_modules/lodash/_apply.js"(exports, module) {
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    module.exports = apply;
  }
});

// node_modules/lodash/_overRest.js
var require_overRest = __commonJS({
  "node_modules/lodash/_overRest.js"(exports, module) {
    var apply = require_apply();
    var nativeMax = Math.max;
    function overRest(func, start, transform) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }
    module.exports = overRest;
  }
});

// node_modules/lodash/constant.js
var require_constant = __commonJS({
  "node_modules/lodash/constant.js"(exports, module) {
    function constant(value) {
      return function() {
        return value;
      };
    }
    module.exports = constant;
  }
});

// node_modules/lodash/_baseSetToString.js
var require_baseSetToString = __commonJS({
  "node_modules/lodash/_baseSetToString.js"(exports, module) {
    var constant = require_constant();
    var defineProperty = require_defineProperty();
    var identity = require_identity();
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant(string),
        "writable": true
      });
    };
    module.exports = baseSetToString;
  }
});

// node_modules/lodash/_shortOut.js
var require_shortOut = __commonJS({
  "node_modules/lodash/_shortOut.js"(exports, module) {
    var HOT_COUNT = 800;
    var HOT_SPAN = 16;
    var nativeNow = Date.now;
    function shortOut(func) {
      var count = 0, lastCalled = 0;
      return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(void 0, arguments);
      };
    }
    module.exports = shortOut;
  }
});

// node_modules/lodash/_setToString.js
var require_setToString = __commonJS({
  "node_modules/lodash/_setToString.js"(exports, module) {
    var baseSetToString = require_baseSetToString();
    var shortOut = require_shortOut();
    var setToString = shortOut(baseSetToString);
    module.exports = setToString;
  }
});

// node_modules/lodash/_baseRest.js
var require_baseRest = __commonJS({
  "node_modules/lodash/_baseRest.js"(exports, module) {
    var identity = require_identity();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + "");
    }
    module.exports = baseRest;
  }
});

// node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "node_modules/lodash/_isIterateeCall.js"(exports, module) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    module.exports = isIterateeCall;
  }
});

// node_modules/lodash/sortBy.js
var require_sortBy = __commonJS({
  "node_modules/lodash/sortBy.js"(exports, module) {
    var baseFlatten = require_baseFlatten();
    var baseOrderBy = require_baseOrderBy();
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    var sortBy = baseRest(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var length = iteratees.length;
      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteratees = [];
      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteratees = [iteratees[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });
    module.exports = sortBy;
  }
});
export default require_sortBy();
//# sourceMappingURL=lodash_sortBy.js.map
