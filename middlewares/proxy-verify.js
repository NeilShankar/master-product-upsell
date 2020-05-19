require('isomorphic-fetch');
require('dotenv').config();

var querystring = require('querystring');

const path = require('path');

const crypto = require('crypto');


module.exports = (function(){

	return function(request, response, next){

		const {SHOPIFY_API_SECRET_KEY} = process.env;

		var hash, input, query, query_string, ref, ref1, ref2, signature;

		query_string = (ref = (ref1 = request.url.match(/\?(.*)/)) != null ? ref1[1] : void 0) != null ? ref : '';
		query = querystring.parse(query_string);
		signature = (ref2 = query.signature) != null ? ref2 : '';

		delete query.signature;

		input = Object.keys(query).sort().map(function(key) {
		var value;
		value = query[key];

		if (!Array.isArray(value)) {
		  value = [value];
		}

		return key + "=" + (value.join(','));
		}).join('');
		hash = crypto.createHmac('sha256', SHOPIFY_API_SECRET_KEY).update(input).digest('hex');

		if (signature !== hash) {
			   console.log('Failed to Verify Signature')
			   console.log(hash)
			   console.log(signature)
		} else {
			next();
		}

		return null;

	}


})();