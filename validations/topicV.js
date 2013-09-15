"use strict";

/*
	topic: {
		createTime: (int)
		key: key,
		cryptKeys: [key],
		receiver: (int),
		creator: (int),
		newest (int),
		unread: (bool)
	}
*/


var topicJSON = {
	"type": "object",
	"properties": {
		"createTime": {
			"required": true,
			"type": "number",
			"min": 1376244464102
		},
		"key": {
			"required": true,
			"type": "string",
			"realid": true
		},
		"topicHash": {
			"required": true,
			"type": "string",
			"hex": true
		},
		"cryptKeys": {
			"type": "Array",
			"items": {
				"type": "object"
			}
		},
		"receiver": {
			"required": true,
			"type": "Array",
			"items": {
				"type": "number",
				"min": 1
			}
		},
		"creator": {
			"type": "number",
			"min": 1
		},
		"newest": {
			"type": "number",
			"min": 1
		},
		"unread": {
			"type": "boolean",
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
