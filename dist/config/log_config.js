const path = require('path');
const baseLogPath = path.resolve(__dirname, '../logs');
const errorPath = "/error";
const errorFileName = "error";
const errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
const responsePath = "/response";
const responseFileName = "response";
const responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
module.exports = {
    "appenders": {
        "errorLogger": {
            "category": "errorLogger",
            "type": "dateFile",
            "filename": errorLogPath,
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log",
            "path": errorPath
        },
        "resLogger": {
            "category": "resLogger",
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd.log",
            "path": responsePath
        }
    },
    categories: {
        "default": { "appenders": ["resLogger"], "level": "all" },
        "resLogger": { "appenders": ["resLogger"], "level": "info" },
        "errorLogger": { "appenders": ["errorLogger"], "level": "error" },
        "http": { "appenders": ["resLogger"], "level": "info" }
    },
    "baseLogPath": baseLogPath
};
//# sourceMappingURL=log_config.js.map