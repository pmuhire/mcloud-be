function corsFunction(req, res, next) {
    const allowedOrigins = ['*'];
    const { origin } = req.headers;
    console.log(origin);
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin');
    }
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    next();
}

module.exports = corsFunction;