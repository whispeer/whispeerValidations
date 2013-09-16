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
		"key": {
			"required": true
		},
		"iv": {
			"required": true,
			"type": "string",
			"hex": true
		},
		"content": {
			"required": true,
			"type": "string"
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
