import {
  require_defineProperty
} from "./chunk-LGSBE47T.js";
import {
  __commonJS
} from "./chunk-WXXH56N5.js";

// node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

export {
  require_baseAssignValue
};
//# sourceMappingURL=chunk-HDX65MB4.js.map
