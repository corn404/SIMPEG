const WebResponse = (res, code, status, DATA) => {
  if (DATA) {
    return res.status(code).json({
      code,
      status,
      data: DATA,
    });
  }

  return res.status(code).json({
    code,
    status,
  });
};

module.exports = WebResponse;
