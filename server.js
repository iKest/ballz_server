const express = require('express');
const consign = require('consign');
const { decorateApp } = require('@awaitjs/express');

const app = decorateApp(express());

consign({
    verbose: false
})
    .include('db.js')
    .then('libs/middlewares.js')
    .then('libs/logger.js')
    .then('controllers/validators')
    .then('controllers/error_senders')
    .then('controllers')
    .then('routes')
    .then('libs/boot.js')
    .into(app);
