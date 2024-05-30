import express from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Please login again." });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {

      // If tken has expires0, return a 401 Unauthorized status with a specific message
      
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      // If token is invalid or malformed, return a 401 Unauthorized status with a specific message
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    } else {
      // For other types of errors, log the error and return a 500 Internal Server Error status
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};

export default authMiddleware;
