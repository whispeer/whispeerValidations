(function () {
	"use strict";
	var amanda, h, jsonSchemaValidator;

	var validations = {};

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
				var result = doValidate(validations[name], data);
				if (result) {
					console.log("validation failed");
					console.log(result);
				}
				return result;
			} else {
				throw "unregistered validation: " + name;
			}
		}
	};

	function amandaLoaded(am, helper, profileV, profileEncryptedV, postV, messageV, topicV, circleV) {
		amanda = am;
		h = helper;

		validator.register("profile", profileV);
		validator.register("profileEncrypted", profileEncryptedV);
		validator.register("post", postV);
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
		if (typeof define !== "undefined") {
			console.log(JSON.stringify(load));
			define(load, function() {
				cb.apply(null, arguments);

				return exported;
			});
		} else if (typeof module !== "undefined" && module.exports && typeof require !== "undefined") {
			var modules = [], i;
			for (i = 0; i < load.length; i += 1) {
				modules.push(require(load[i]));
			}

			cb.apply(null, modules);

			module.exports = exported;
		}
	}

	doLoad(amandaLoaded, validator,
		[
			"amanda",
			"whispeerHelper",
			"./validations/profileV",
			"./validations/profileEncryptedV",
			"./validations/postV",
			"./validations/messageV",
			"./validations/topicV",
			"./validations/circleV"
		]);
})();
