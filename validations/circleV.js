(function () {
	"use strict";

	/*
		circle: {
			key,
			content,
			iv
		}
	*/

	var circleJSON = {
		"type": "object",
		"properties": {
			"meta": {
				"type": "object",
				"required": true,
				"properties": {
					"users": {
						"type": "array",
						"items": {
							"type": "integer"
						}
					},
					"circleKey": {
						"required": true,
						"type": "string"
					}
				}
			},
			"content": {
				"type": "object",
				"required": true,
				"extends": "encryptedData",
				"properties": {}
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = circleJSON;
	} else if (typeof define !== "undefined") {
		define(function() {
			return circleJSON;
		});
	}
})();