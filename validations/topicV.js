"use strict";

/*
	topic: {
		//thinking: we need multiple ones here right?
		key: key,
		receiver: (int),
		creator: (int),
		newest (int),
		unread: (bool)
	}
*/

var topicJSON = {
	"type": "object",
	"properties": {
		"key": {

		},
		"receiver": {
			"required": true,
			"type": "number",
			"min": 1
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
