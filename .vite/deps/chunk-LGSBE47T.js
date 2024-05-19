import {
  require_getNative
} from "./chunk-EUM3NQ5V.js";
import {
  __commonJS
} from "./chunk-WXXH56N5.js";

// node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "node_modules/lodash/_defineProperty.js"(exports, module) {
    var getNative = require_getNative();
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    }();
    module.exports = defineProperty;
  }
});

export {
  require_defineProperty
};
//# sourceMappingURL=chunk-LGSBE47T.js.map
