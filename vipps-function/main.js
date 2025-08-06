export default async ({ req, res, log }) => {
  log("Function started successfully!");
  return res.json({
    message: "Hello World",
    timestamp: new Date().toISOString(),
  });
};
