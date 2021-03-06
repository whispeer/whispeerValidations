(function () {
	"use strict";

	/*
		topic: {
			createTime: (int)
			key: key,
			receiver: [{identifier, key}],
			creator: (int),
			newest (int),
			unread: (bool)
		}
	*/

	var topicJSON = {
		"name": "Topic",
		"type": "object",
		"extends": "securedData",
//		"additionalProperties": false,
		"properties": {
			"createTime": {
				"required": true,
				"type": "number",
				"min": 1376244464102
			},
			"_key": {
				"required": true,
				"type": "string"
			},
			"receiver": {
				"required": true,
				"type": "array",
				"items": {
					"type": "integer",
					"min": 1
				}
			},
			"creator": {
				"required": true,
				"type": "number",
				"min": 1
			}
		}
	};

	if (typeof module !== "undefined" && module.exports) {
		module.exports = topicJSON;
	} else if (typeof define !== "undefined") {
		define(function() {
			return topicJSON;
		});
	}
})();