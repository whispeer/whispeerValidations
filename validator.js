(function () {
	"use strict";
	var amanda, h, jsonSchemaValidator;

	var validations = {};
	var encrValidations = {};

	var encryptedProperties = {
		type: "object",
		additionalProperties: false,
		properties: {
			iv: {
				"type": "string",
				"hex": true
			},
			ct: {
				"type": "string",
				"hex": true
			}
		}
	};

	var EncryptedValidation = function (data, depth) {
		this._data = data;
		this._depth = depth;
	};

	EncryptedValidation.prototype._makeValidatorForPropertyObject = function () {
		var result = {}, attr;

		for (attr in this._data) {
			if (this._data.hasOwnProperty(attr)) {
				result[attr] = new EncryptedValidation(this._data[attr], this._depth - 1).make();
			}
		}

		return result;
	};

	EncryptedValidation.prototype._makeValidatorDependingOnTypes = function () {
		var result = {};

		result.type = this._data.type;
		result.required = this._data.required;
		result.additionalProperties = this._data.additionalProperties;

		if (this._data.type === "string") {
			result = encryptedProperties;
		} else if (this._data.type === "object") {
			result.properties = new EncryptedValidation(this._data.properties, this._depth).make();
		} else if (this._data.type === "Array") {
			//TODO (encryptObject is not ready for arrays yet)!
			//result.items = makeEncryptedValidator(this._data.items);
			throw "Array not implemented";
		}

		return result;
	};

	EncryptedValidation.prototype._makeEncryptedValidator = function () {
		if (this._data.type) {
			return this._makeValidatorDependingOnTypes();
		}

		return this._makeValidatorForPropertyObject();
	};

	EncryptedValidation.prototype.make = function () {
		var result = {};
		if (this._depth > 0) {
			result = this._makeEncryptedValidator();
		} else {
			result = encryptedProperties;
		}

		return result;
	};

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
		validateEncrypted: function (name, data, depth) {
			if (!encrValidations[name]) {
				if (validations[name]) {
					encrValidations[name] = new EncryptedValidation(validations[name], depth).make();
				} else {
					throw "unregistered validation: " + name;
				}
			}

			return doValidate(encrValidations[name], data);
		}
	};

	function amandaLoaded(am, helper, profileV, messageV, topicV, circleV) {
		amanda = am;
		h = helper;

		validator.register("profile", profileV);
		validator.register("message", messageV);
		validator.register("topic", topicV);
		validator.register("circle", circleV);

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

			cb.apply(null, modules);

			module.exports = exported;
		} else if (typeof define !== "undefined") {
			console.log(JSON.stringify(load));
			define(load, function() {
				cb.apply(null, arguments);

				return exported;
			});
		}
	}

	doLoad(amandaLoaded, validator, ["amanda", "whispeerHelper", "./validations/profileV", "./validations/messageV", "./validations/topicV", "./validations/circleV"]);
})();

