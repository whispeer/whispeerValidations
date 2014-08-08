(function () {
	"use strict";

	/*
		post: {
			meta: {
				contentHash,
				time,
				signature,
				(key),
				(receiver), //for a wallpost
			}
			content //padded!
		}
	*/

	var postJSON = {
		"name": "Post",
		"type": "object",
		"properties": {
			"meta": {
				"required": true,
				"type": "object",
				"extends": "securedDataContent",
				"properties": {
					"sender": {
						"required": true,
						"type": "integer"
					},
					"time": {
						"required": true,
						"type": "integer",
						"min": 1388714536420
					},
					"key": {
						"type": "object"
					},
					"walluser": {
						"type": "integer",
						"min": 1
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
		module.exports = postJSON;
	} else if (typeof define !== "undefined") {
		define(function() {
			return postJSON;
		});
	}
})();