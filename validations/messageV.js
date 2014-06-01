(function () {
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
					"createTime": {
						"required": true,
						"type": "integer",
						"min": 1388718525297
					},
					"topicHash": {
						"required": true,
						"type": "string"
					},
					"previousMessage": {
						"required": true,
						"type": "integer",
						"min": 0
					},
					"previousMessageHash": {
						"required": true,
						"type": "string"
					},
					"ownHash": {
						"type": "string"
					},
					"_signature": {
						"required": true,
						"type": "string",
						"hex": true
					},
					"encrSignature": {
						"type": "string",
						"hex": true
					},

					"sender": {
						"type": "integer",
						"min": 1
					},
					"topicid": {
						"type": "integer",
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
						"required": true
					},
					"iv": {
						"required": true,
						"type": "string",
						"hex": true
					},
					"ct": {
						"type": "string"
					},
					"text": {
						"type": "string"
					}
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
})();