import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach user to request
    next();
  } catch (error) {
    return res
        .status(401)
        .json({ error: "Invalid token" });
  }
};

export {verifyJWT}
