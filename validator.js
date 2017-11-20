(function () {
	"use strict";
	var h;

	var validations = {};

	function doValidate(ref, data) {
		if (ref) {
			var theError;
			/*amanda.validate(data, ref, function (err) {
				theError = err;
			});*/

			return theError;
		} else {
			throw new Error("unregistered validation");
		}
	}

	var validator = {
		addAttribute: function (name, cb) {
			// jsonSchemaValidator.addAttribute(name, cb);
		},
		register: function (name, obj) {
			if (validations[name]) {
				throw new Error("double registered validations: " + name);
			}

			validations[name] = obj;
		},
		validate: function (name, data) {
			if (validations[name]) {
				var result = doValidate(validations[name], data);
				if (result) {
					console.error(result);
				}
				return result;
			} else {
				throw new Error("unregistered validation: " + name);
			}
		}
	};

	function amandaLoaded(am, helper, profileV, profileEncryptedV, postV, messageV, topicV, topicCreateV, circleV) {
		h = helper;

		validator.register("profile", profileV);
		validator.register("profileEncrypted", profileEncryptedV);
		validator.register("post", postV);
		validator.register("message", messageV);
		validator.register("topic", topicV);
		validator.register("topicCreate", topicCreateV);
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
	}

	const modules = []

	modules.push(require("amanda"))
	modules.push(require("whispeerHelper"))
	modules.push(require("./validations/profileV"))
	modules.push(require("./validations/profileEncryptedV"))
	modules.push(require("./validations/postV"))
	modules.push(require("./validations/messageV"))
	modules.push(require("./validations/topicV"))
	modules.push(require("./validations/topicCreateV"))
	modules.push(require("./validations/circleV"))

	amandaLoaded.apply(null, modules)

	module.exports = validator;
})();
