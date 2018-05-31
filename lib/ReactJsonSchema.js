import { DOM, createElement } from "react";

const _componentMap = new WeakMap();

export default class ReactJsonSchema {
	parseSchema(schema) {
		let element = null;
		let elements = null;
		if (Array.isArray(schema)) {
			elements = this.parseSubSchemas(schema);
		} else {
			element = this.createComponent(schema);
		}
		return element || elements;
	}

	parseSubSchemas(subSchemas = []) {
		const Components = [];
		let index = 0;
		for (const subSchema of subSchemas) {
			subSchema.key =
				typeof subSchema.key !== "undefined" ? subSchema.key : index;
			Components.push(this.parseSchema(subSchema));
			index++;
		}
		return Components;
	}

	createComponent(schema) {
		const { __component__, __children__, __text__, ...rest } = schema;
		const Component = this.resolveComponent(schema);
		if (__children__ === undefined && __text__ === undefined) {
			return createElement(Component, rest);
		}
		const Children =
			typeof __text__ !== "undefined"
				? __text__
				: this.resolveComponentChildren(schema);
		return createElement(Component, rest, Children);
	}

	resolveComponent(schema) {
		const componentMap = this.getComponentMap();
		let Component = null;
		if (schema.hasOwnProperty("__component__")) {
			if (schema.__component__ === Object(schema.__component__)) {
				Component = schema.__component__;
			} else if (componentMap && componentMap[schema.__component__]) {
				Component = componentMap[schema.__component__];
			} else if (DOM.hasOwnProperty(schema.__component__)) {
				Component = schema.__component__;
			}
		} else {
			throw new Error(
				"ReactJsonSchema could not resolve a component due to a missing component attribute in the schema."
			);
		}
		return Component;
	}

	resolveComponentChildren(schema) {
		return schema.hasOwnProperty("__children__")
			? this.parseSchema(schema.__children__)
			: [];
	}

	getComponentMap() {
		return _componentMap.get(this);
	}

	setComponentMap(componentMap) {
		_componentMap.set(this, componentMap);
	}
}
