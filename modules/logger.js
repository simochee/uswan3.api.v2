const log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: 'file',
            category: 'curfew',
            filename: './logs/curfew.log',
            pattern: '-yyyy-MM-dd'
        }
    ]
});

module.exports = {
    
}