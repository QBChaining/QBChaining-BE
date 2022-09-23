const sseMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  res.flushHeaders();

  const sse = (data) => {
    const sseresponse = `data: ${JSON.stringify(data)}\n\n`;
    return res.write(sseresponse);
  };

  Object.assign(res, {
    sse,
  });

  next();
};

export default sseMiddleware;
