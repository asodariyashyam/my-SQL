module.exports = {
  reply: async function (res, errorCode, isError, message, data) {
    return res.status(200).json({
      msg: message,
      error: isError,
      statusCode: errorCode,
      data: data,
    });
  },
};

module.exports.cookie = (req, res, next) => {
  res.locals.cookieData = req.cookies.cookieData || null;
  next();
};
