"use strict";

import Location from "./Location.js";
import { escapeString } from "../util.js";

export default class Token {

	constructor (type, lexeme, location) {
		this.type = type;
		this.lexeme = lexeme;
		this.location = location;
	}

	toString () {
		return `${this.type} "${escapeString(this.lexeme)}" at ${this.location}`;
	}

	static EOF = new Token("EOF", "", new Location(null, null));

}