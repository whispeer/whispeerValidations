"use strict";

/*
	message: {
		meta: {
			previousOwn: (int),
			previousOther: (int),
			sender: (int),
			signature: (hex),
			topicid: (int),
			read: (bool)
		}
		content: {
			key,
			iv: (hex),
			text: (hex),
			signature: (hex)
		}

	}

*/

var messageJSON = {
	"type": "object",
	"properties": {
		"meta": {
			"type": "object",
			"properties": {
				"previousOwn": {
					"required": true,
					"type": "number",
					"min": 1
				},
				"previousOther": {
					"required": true,
					"type": "number",
					"min": 1
				},
				"signature": {
					"required": true,
					"type": "string",
					"hex": true
				},
				"sender": {
					"type": "number",
					"min": 1
				},
				"topicid": {
					"type": "number",
					"min": 1
				},
				"read": {
					"type": "boolean"
				}
			}
		},
		"content": {
			"type": "object",
			"properties": {
				"key": {
					"required": true,
					"type": "string",
					"key": true
				},
				"iv": {
					"required": true,
					"type": "string",
					"hex": true
				},
				"text": {
					"required": true,
					"type": "string"
				},
				"signature": {
					"required": true,
					"type": "string",
					"hex": true
				},
			}
		}
	}
};

if (typeof module !== "undefined" && module.exports) {
	module.exports = messageJSON;
} else if (typeof define !== "undefined") {
	define(function() {
		return messageJSON;
	});
}
