//Not Found

const notFound = (req,res,next) => {
    const error = new Error(`Not Found : ${req.originalURL}`);
    res.status(404);
    next(error)
};

//Error handler

const errorhandler = (err, req, res, next ) => {
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.json({
        message : err?.message,
        stack : err?.stack
    });
}
module.exports = {errorhandler , notFound}