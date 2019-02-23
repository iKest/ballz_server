const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const appRoot = require('app-root-path');
const exphbs = require('express-handlebars');

const app = require('config').get('app');

const whitelist = ['https://vk.com', 'https://www.ok.ru'];
whitelist.push(app.clientUrl);
const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST']
};

module.exports = _ => {
    _.set('port', app.port);
    _.use(helmet());
    _.use(cors(corsOptions));
    _.set('json spaces', 2);
    _.use(
        express.urlencoded({
            extended: true
        })
    );
    _.set('views', './views');
    _.engine(
        'hbs',
        exphbs({
            extname: '.hbs'
        })
    );
    _.set('view engine', '.hbs');

    _.use(express.json());
    _.use(app.staticURL, express.static(appRoot.resolve(app.staticFolder)));
};
