"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _componentMap = new WeakMap();

var ReactJsonSchema = function () {
	function ReactJsonSchema() {
		_classCallCheck(this, ReactJsonSchema);
	}

	_createClass(ReactJsonSchema, [{
		key: "parseSchema",
		value: function parseSchema(schema) {
			var element = null;
			var elements = null;
			if (Array.isArray(schema)) {
				elements = this.parseSubSchemas(schema);
			} else {
				element = this.createComponent(schema);
			}
			return element || elements;
		}
	}, {
		key: "parseSubSchemas",
		value: function parseSubSchemas() {
			var subSchemas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			var Components = [];
			var index = 0;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = subSchemas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var subSchema = _step.value;

					subSchema.key = typeof subSchema.key !== "undefined" ? subSchema.key : index;
					Components.push(this.parseSchema(subSchema));
					index++;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return Components;
		}
	}, {
		key: "createComponent",
		value: function createComponent(schema) {
			var __component__ = schema.__component__,
			    __children__ = schema.__children__,
			    __text__ = schema.__text__,
			    rest = _objectWithoutProperties(schema, ["__component__", "__children__", "__text__"]);

			var Component = this.resolveComponent(schema);
			if (__children__ === undefined && __text__ === undefined) {
				return (0, _react.createElement)(Component, rest);
			}
			var Children = typeof __text__ !== "undefined" ? __text__ : this.resolveComponentChildren(schema);
			return (0, _react.createElement)(Component, rest, Children);
		}
	}, {
		key: "resolveComponent",
		value: function resolveComponent(schema) {
			var componentMap = this.getComponentMap();
			var Component = null;
			if (schema.hasOwnProperty("__component__")) {
				if (schema.__component__ === Object(schema.__component__)) {
					Component = schema.__component__;
				} else if (componentMap && componentMap[schema.__component__]) {
					Component = componentMap[schema.__component__];
				} else {
					Component = schema.__component__;
				}
			} else {
				throw new Error("ReactJsonSchema could not resolve a component due to a missing component attribute in the schema.");
			}
			return Component;
		}
	}, {
		key: "resolveComponentChildren",
		value: function resolveComponentChildren(schema) {
			return schema.hasOwnProperty("__children__") ? this.parseSchema(schema.__children__) : [];
		}
	}, {
		key: "getComponentMap",
		value: function getComponentMap() {
			return _componentMap.get(this);
		}
	}, {
		key: "setComponentMap",
		value: function setComponentMap(componentMap) {
			_componentMap.set(this, componentMap);
		}
	}]);

	return ReactJsonSchema;
}();

exports.default = ReactJsonSchema;
