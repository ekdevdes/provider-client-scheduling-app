"use client";
import {
  init_unsupportedProp,
  unsupportedProp_default
} from "./chunk-JJWGCOOW.js";
import {
  ButtonBase_default
} from "./chunk-A4DKFZAM.js";
import "./chunk-SBSME3SB.js";
import "./chunk-IXMLHEK2.js";
import "./chunk-JJIV7TB6.js";
import "./chunk-OOCFQ3FX.js";
import "./chunk-ZUOTOZXL.js";
import "./chunk-UIIM5O77.js";
import "./chunk-NAYD5MMG.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_clsx,
  init_composeClasses,
  init_extends,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_objectWithoutPropertiesLoose,
  init_styled,
  init_useThemeProps2 as init_useThemeProps,
  require_jsx_runtime,
  require_prop_types,
  styled_default,
  useThemeProps2 as useThemeProps
} from "./chunk-I7G7RPHJ.js";
import {
  require_react
} from "./chunk-6P5PNMGD.js";
import {
  __toESM
} from "./chunk-WXXH56N5.js";

// node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_styled();
init_useThemeProps();
init_unsupportedProp();

// node_modules/@mui/material/BottomNavigationAction/bottomNavigationActionClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getBottomNavigationActionUtilityClass(slot) {
  return generateUtilityClass("MuiBottomNavigationAction", slot);
}
var bottomNavigationActionClasses = generateUtilityClasses("MuiBottomNavigationAction", ["root", "iconOnly", "selected", "label"]);
var bottomNavigationActionClasses_default = bottomNavigationActionClasses;

// node_modules/@mui/material/BottomNavigationAction/BottomNavigationAction.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["className", "icon", "label", "onChange", "onClick", "selected", "showLabel", "value"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    showLabel,
    selected
  } = ownerState;
  const slots = {
    root: ["root", !showLabel && !selected && "iconOnly", selected && "selected"],
    label: ["label", !showLabel && !selected && "iconOnly", selected && "selected"]
  };
  return composeClasses(slots, getBottomNavigationActionUtilityClass, classes);
};
var BottomNavigationActionRoot = styled_default(ButtonBase_default, {
  name: "MuiBottomNavigationAction",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.showLabel && !ownerState.selected && styles.iconOnly];
  }
})(({
  theme,
  ownerState
}) => _extends({
  transition: theme.transitions.create(["color", "padding-top"], {
    duration: theme.transitions.duration.short
  }),
  padding: "0px 12px",
  minWidth: 80,
  maxWidth: 168,
  color: (theme.vars || theme).palette.text.secondary,
  flexDirection: "column",
  flex: "1"
}, !ownerState.showLabel && !ownerState.selected && {
  paddingTop: 14
}, !ownerState.showLabel && !ownerState.selected && !ownerState.label && {
  paddingTop: 0
}, {
  [`&.${bottomNavigationActionClasses_default.selected}`]: {
    color: (theme.vars || theme).palette.primary.main
  }
}));
var BottomNavigationActionLabel = styled_default("span", {
  name: "MuiBottomNavigationAction",
  slot: "Label",
  overridesResolver: (props, styles) => styles.label
})(({
  theme,
  ownerState
}) => _extends({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(12),
  opacity: 1,
  transition: "font-size 0.2s, opacity 0.2s",
  transitionDelay: "0.1s"
}, !ownerState.showLabel && !ownerState.selected && {
  opacity: 0,
  transitionDelay: "0s"
}, {
  [`&.${bottomNavigationActionClasses_default.selected}`]: {
    fontSize: theme.typography.pxToRem(14)
  }
}));
var BottomNavigationAction = React.forwardRef(function BottomNavigationAction2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiBottomNavigationAction"
  });
  const {
    className,
    icon,
    label,
    onChange,
    onClick,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const handleChange = (event) => {
    if (onChange) {
      onChange(event, value);
    }
    if (onClick) {
      onClick(event);
    }
  };
  return (0, import_jsx_runtime2.jsxs)(BottomNavigationActionRoot, _extends({
    ref,
    className: clsx_default(classes.root, className),
    focusRipple: true,
    onClick: handleChange,
    ownerState
  }, other, {
    children: [icon, (0, import_jsx_runtime.jsx)(BottomNavigationActionLabel, {
      className: classes.label,
      ownerState,
      children: label
    })]
  }));
});
true ? BottomNavigationAction.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp_default,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The icon to display.
   */
  icon: import_prop_types.default.node,
  /**
   * The label element.
   */
  label: import_prop_types.default.node,
  /**
   * @ignore
   */
  onChange: import_prop_types.default.func,
  /**
   * @ignore
   */
  onClick: import_prop_types.default.func,
  /**
   * If `true`, the `BottomNavigationAction` will show its label.
   * By default, only the selected `BottomNavigationAction`
   * inside `BottomNavigation` will show its label.
   *
   * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
   */
  showLabel: import_prop_types.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: import_prop_types.default.any
} : void 0;
var BottomNavigationAction_default = BottomNavigationAction;
export {
  bottomNavigationActionClasses_default as bottomNavigationActionClasses,
  BottomNavigationAction_default as default,
  getBottomNavigationActionUtilityClass
};
//# sourceMappingURL=@mui_material_BottomNavigationAction.js.map
