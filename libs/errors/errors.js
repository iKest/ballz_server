module.exports = new Map([
    [
        'API_ERROR_SERVER',
        {
            code: 1,
            message: 'Ошибка сервера'
        }
    ],
    [
        'API_ERROR_REQUEST',
        {
            code: 2,
            message: 'Некорректные параметры запроса'
        }
    ],
    [
        'API_ERROR_SIGNATURE',
        {
            code: 3,
            message: 'Несовпадение вычисленной и переданной подписи запроса'
        }
    ],
    [
        'API_ERROR_PASSWORD',
        {
            code: 4,
            message: 'Неверный пароль пользователя'
        }
    ],
    [
        'API_ERROR_ITEMS',
        {
            code: 5,
            message: 'Товары не найдены'
        }
    ],
    [
        'API_ERROR_DB',
        {
            code: 6,
            message: 'SERVICE: DB connection rerror. Please try again later'
        }
    ],
    [
        'API_ERROR_UNKNOWN',
        {
            code: 7,
            message: 'Неизвестная ошибка'
        }
    ],
    [
        'OK_ERROR_UNKNOWN',
        {
            code: 1,
            message:
                'UNKNOWN: please, try again later. If error repeats, contact application support team.'
        }
    ],
    [
        'OK_ERROR_SERVICE',
        {
            code: 2,
            message: 'SERVICE: service temporary unavailible. Please try again later.'
        }
    ],
    [
        'OK_ERROR_PAYMENT',
        {
            code: 3,
            message:
                'CALLBACK_INVALID_PAYMENT: invalid payment data. Please try again later. If error repeats, contact application support team.'
        }
    ],
    [
        'OK_ERROR_DB',
        {
            code: 4,
            message: 'SERVICE: DB connection rerror. Please try again later.'
        }
    ],
    [
        'OK_ERROR_USER',
        {
            code: 5,
            message:
                'CALLBACK_INVALID_PAYMENT: user not found. Please contact application support team.'
        }
    ],
    [
        'OK_ERROR_PRODUCT',
        {
            code: 6,
            message:
                'CALLBACK_INVALID_PAYMENT: product not found. Please contact application support team.'
        }
    ],
    [
        'OK_ERROR_PRODUCT_QUANTITY',
        {
            code: 14,
            message: 'SERVICE: product out of stock. Please try again later.'
        }
    ],
    [
        'OK_ERROR_SYSTEM',
        {
            code: 9999,
            message: 'SYSTEM: critical system error. Please contact application support team.'
        }
    ],
    [
        'OK_ERROR_SIGNATURE',
        {
            code: 104,
            message: 'PARAM_SIGNATURE: invalid signature. Please contact application support team.'
        }
    ],
    [
        'VK_ERROR_SERVICE',
        {
            code: 1,
            critical: 1,
            message: 'SERVICE: service temporary unavailible. Please try again later.'
        }
    ],
    [
        'VK_ERROR_DB',
        {
            code: 2,
            critical: 1,
            message: 'SERVICE: DB connection rerror. Please try again later.'
        }
    ],
    [
        'VK_ERROR_SIGNATURE',
        {
            code: 10,
            critical: 1,
            message: 'PARAM_SIGNATURE: invalid signature. Please contact application support team.'
        }
    ],
    [
        'VK_ERROR_PAYMENT',
        {
            code: 11,
            critical: 1,
            message:
                'CALLBACK_INVALID_PAYMENT: invalid payment data. Please contact application support team.'
        }
    ],
    [
        'VK_ERROR_PRODUCT',
        {
            code: 20,
            critical: 1,
            message:
                'CALLBACK_INVALID_PAYMENT: product not found. Please contact application support team.'
        }
    ],
    [
        'VK_ERROR_PRODUCT_QUANTITY',
        {
            code: 21,
            critical: 1,
            message: 'SERVICE: product out of stock. Please try again later'
        }
    ],
    [
        'VK_ERROR_USER',
        {
            code: 22,
            critical: 1,
            message:
                'CALLBACK_INVALID_PAYMENT: user not found. Please contact application support team.'
        }
    ],
    [
        'VK_ERROR_PRICE',
        {
            code: 100,
            critical: 1,
            message:
                'CALLBACK_INVALID_PAYMENT: invalid price data. Please try again later. If error repeats, contact application support team'
        }
    ],
    [
        'VK_ERROR_RECEIVER',
        {
            code: 102,
            critical: 1,
            message:
                'CALLBACK_INVALID_PAYMENT: receiver not found. Please contact application support team.'
        }
    ],
    [
        'VK_ERROR_UNKNOWN',
        {
            code: 103,
            critical: 1,
            message:
                'UNKNOWN: please, try again later. If error repeats, contact application support team'
        }
    ],
    [
        'FK_ERROR_SERVER',
        {
            code: 1,
            message: 'Ошибка сервера'
        }
    ],
    [
        'FK_ERROR_REQUEST',
        {
            code: 2,
            message: 'Некорректные параметры запроса'
        }
    ],
    [
        'FK_ERROR_SIGNATURE',
        {
            code: 3,
            message: 'Несовпадение вычисленной и переданной подписи запроса'
        }
    ],
    [
        'FK_ERROR_PASSWORD',
        {
            code: 4,
            message: 'Неверный пароль пользователя'
        }
    ],
    [
        'FK_ERROR_DB',
        {
            code: 6,
            message: 'SERVICE: DB connection rerror. Please try again later'
        }
    ],
    [
        'FK_ERROR_UNKNOWN',
        {
            code: 7,
            message: 'Неизвестная ошибка'
        }
    ],
    [
        'FK_ERROR_PRODUCT',
        {
            code: 20,
            message: 'Не верный индификатор товара'
        }
    ],
    [
        'FK_ERROR_PRODUCT_QUANTITY',
        {
            code: 21,
            message: 'Товар закончился, пожалуйста попробуйте произвести покупку позднее'
        }
    ],
    [
        'FK_ERROR_USER',
        {
            code: 22,
            message: 'Пользователь не найден'
        }
    ],
    [
        'FK_ERROR_NO_MONEY',
        {
            code: 23,
            message: 'Не достаточно средств на счету пользователя'
        }
    ]
]);
