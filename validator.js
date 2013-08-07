(function () {
	"use strict";
	var amanda, h, jsonSchemaValidator;

	var validations = {};
	var encrValidations = {};

	function makeEncryptedValidator(data) {
		var result = {};
		if (data.type) {
			result.type = data.type;
			result.required = data.required;

			if (data.type === "string") {
				result.hex = true;
			} else if (data.type === "object") {
				result.additionalProperties = data.additionalProperties;
				result.properties = makeEncryptedValidator(data.properties);
			} else if (data.type === "Array") {
				result.items = makeEncryptedValidator(data.items);
			}
		} else {
			var attr;
			for (attr in data) {
				if (data.hasOwnProperty(attr)) {
					result[attr] = makeEncryptedValidator(data[attr]);
				}
			}
		}

		return result;
	}

	function doValidate(ref, data) {
		if (ref) {
			var theError;
			amanda.validate(data, ref, function (err) {
				theError = err;
			});

			return theError;
		} else {
			throw "unregistered validation";
		}
	}

	var validator = {
		addAttribute: function (name, cb) {
			jsonSchemaValidator.addAttribute(name, cb);
		},
		register: function (name, obj) {
			if (validations[name]) {
				throw "double registered validations: " + name;
			}

			validations[name] = obj;
		},
		validate: function (name, data) {
			if (validations[name]) {
				doValidate(validations[name], data);
			} else {
				throw "unregistered validation: " + name;
			}
		},
		validateEncrypted: function (name, data) {
			if (!encrValidations[name]) {
				if (validations[name]) {
					encrValidations[name] = makeEncryptedValidator(validations[name]);
				} else {
					throw "unregistered validation: " + name;
				}
			}

			return doValidate(encrValidations[name], data);
		}
	};

	function amandaLoaded(am, helper, profileV) {
		amanda = am;
		h = helper;

		validator.register("profile", profileV);

		/**
		 * EvenAttribute
		 *
		 * @param {string} property
		 * @param {any} propertyValue
		 * @param {any} attributeValue
		 * @param {object} propertyAttributes
		 * @param {function} callback
		 */
		var hexAttribute = function(property, propertyValue, attributeValue, propertyAttributes, callback) {

			// If ‘even: true’
			if (attributeValue) {
				if (!h.isHex(propertyValue)) {
					this.addError();
				}
			}

			// Continue...
			return callback();

		};

		// Add a new validator
		jsonSchemaValidator = amanda("json");
		jsonSchemaValidator.addAttribute("hex", hexAttribute);
	}

	function doLoad(cb, exported, load) {
		if (typeof module !== "undefined" && module.exports && typeof require !== "undefined") {
			var modules = [], i;
			for (i = 0; i < load.length; i += 1) {
				modules.push(require(load[i]));
			}

			cb(modules);

			module.exports = exported;
		} else if (typeof define !== "undefined") {
			define(load, function() {
				cb.apply(null, arguments);

				return exported;
			});
		}
	}

	doLoad(amandaLoaded, validator, ["amanda", "helper", "./validations/profileV"]);
})();

