// --------------------------------------------------------------------------------------------------------------------
//
// yahoo/yahoo.js - class for the Yahoo API
//
// Copyright (c) 2012 AppsAttic Ltd - http://www.appsattic.com/
// Written by Andrew Chilton <chilts@appsattic.com>
//
// License: http://opensource.org/licenses/MIT
//
// --------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------
// requires

// built-ins
var util = require('util');

// dependencies
var _ = require('underscore');

// our own
var awssum = require('../awssum');
var oauth = awssum.load('oauth');
var operations = require('./yahoo-config');

// --------------------------------------------------------------------------------------------------------------------
// package variables

var MARK = 'yahoo: ';

// --------------------------------------------------------------------------------------------------------------------
// constructor

var Yahoo = function(oauthConsumerKey, oauthConsumerSecret) {
    var self = this;

    // call the superclass for initialisation
    Yahoo.super_.call(this, oauthConsumerKey, oauthConsumerSecret);

    return self;
};

// inherit from OAuth
util.inherits(Yahoo, oauth.OAuth);

// --------------------------------------------------------------------------------------------------------------------
// methods we need to implement from awssum.js/amazon.js

Yahoo.prototype.host = function() {
    return 'api.yahoo.com';
};

Yahoo.prototype.version = function() {
    return 'v2';
};

Yahoo.prototype.requestTokenHost = function() {
    return 'api.login.yahoo.com';
};
Yahoo.prototype.requestTokenPath = function() {
    return '/oauth/v2/get_request_token';
};
Yahoo.prototype.authorizeHost = function() {
    return 'api.login.yahoo.com';
};
Yahoo.prototype.authorizePath = function() {
    return '/oauth/v2/request_auth';
};
Yahoo.prototype.accessTokenHost = function() {
    return 'api.login.yahoo.com';
};
Yahoo.prototype.accessTokenPath = function() {
    return '/oauth/v2/get_token';
};

// --------------------------------------------------------------------------------------------------------------------
// operations on the service

_.each(operations, function(operation, operationName) {
    Yahoo.prototype[operationName] = awssum.makeOperation(operation);
});

// --------------------------------------------------------------------------------------------------------------------
// exports

module.exports = Yahoo;

// --------------------------------------------------------------------------------------------------------------------