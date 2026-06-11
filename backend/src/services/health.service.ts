export const getHealthStatus = () => {
  return {
    success: true,
    message: "Backend is healthy",
    timestamp: new Date().toISOString(),
  };
};
