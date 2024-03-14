const React = require("react");
function SvoddLogoIcon({
     title,
     titleId,
     ...props
 }, svgRef) {
    return /*#__PURE__*/React.createElement("svg", Object.assign({
        xmlns: "http://www.w3.org/2000/svg",
        fill: "#CC0000",
        viewBox: "0 0 516 515",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: svgRef,
        "aria-labelledby": titleId
    }, props), title ? /*#__PURE__*/React.createElement("title", {
        id: titleId
    }, title) : null, /*#__PURE__*/React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M258 401.5L417.5 515L360.5 319.5L516 201L320 196L258 0L196 196L0 201L155.5 319.5L98.5 515L258 401.5Z"
    }));
}
const ForwardRef = React.forwardRef(SvoddLogoIcon);
module.exports = ForwardRef;