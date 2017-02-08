const STATUS = {
    ERROR: 'error',
    SUCCESS: 'success',
    UNAUTHORIXED: 'unauthorixed'
}

module.exports = {
    res: {
        error: (res, msg) => {
            res.status(404);
            res.json({
                status: STATUS.ERROR,
                message: msg
            });
        },
        success: (res) => {
            res.json({
                status: STATUS.SUCCESS
            });
        },
        unauthorixed: (res) => {
            res.status(401);
            res.json({
                status: STATUS.UNAUTHORIXED
            });
        }
    }
}