"use strict";
"hide implementation";

const Lexer = require("../../../Lexer-generator/Lexer-generator.js");

module.exports = new Lexer()
	.define("digit", /\d/)
	.ignore("whitespace", /\s+/)
	.ignore("comment", /\/\/[^\n]*|\/\*[^*]*?\*\//)
	.rule("string", /(?<!\\)".*?"/)
	.rule("template-literal", /(?<!\\)`.*`/)
	.rule("semicolon", ";")
	.rule("punctuation", /[,\(\)]/)
	.rule("block-start", "{")
	.rule("block-end", "}")
	.rule("object-start", "[")
	.rule("object-end", "]")
	.rule("type-annotation", /[a-zA-Z\[\]\{\}\<\>]*:/)
	.rule("not-equals", /!=/)
	.rule("equals-equals", /==/)
	.rule("operator", /[.=+\-/*%^~<>?&|!]|::?|\b(new|exists|instanceof|typeof|in|and|or)\b/)
	.rule("controller", /\b(for|return|emits?|if|when|while|then|else|continue|throw|using|repeat|operator|iife)\b/)
	.rule("preprocessor-directive", /#|\bdefine\b/)
	.rule("storage-type", /\b(const|var|type|function|class|template)\b/)
	.rule("storage-modifier", /\b(implements|extends|overt|delegate)\b/)
	.rule("builtin", /\b(event|Function|Array|Object|String|Boolean|Number|Math|Error|Class)\b/)
	.rule("decimal-number", /{digit}*\.{digit}+(?:e[+-]?{digit}+)?/i)
	.rule("integer-number", /{digit}+/)
	.rule("literal", /\b(true|false|nothing|undefined)\b/)
	.rule("identifier", /[a-zA-Z_$][\w$]*/)
	.rule("decorator", /@{identifier}/);