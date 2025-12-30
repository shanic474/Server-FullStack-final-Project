import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";


export default {
  verifyCookieToken(req, res, next) {
    const token = req.cookies?.token;
    console.log("Verifying token:", token);
    // if token is valid, attach user info to
    req.user = null;
  
    // no cookie → skip verification
    if (!token) return next();
  
    // cookie exists → verify token
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      return next(); // continue to loginController
    } catch (error) {
      console.log("JWT verification error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  },
  verifyAdminToken: (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("Verifying token:", token);

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    if (!["admin", "manager"].includes(decoded.role)) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
},
  createUser: async (req, res) => {
    try {
      console.log(req.body);
      const { user_name, user_email, password, phone_number, user_role } =
        req.body;

      // Validate required fields
      if (!user_name || !user_email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email and password are required" });
      }
      // Check if user already exists
      const existingUser = await userModel.findOne({ user_email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      const user = await userModel.create(req.body);
      res.status(200).json({ message: "User signed up successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  authlogin: async (req, res, next) => {
    try {
      //  login via email/password
      const { user_email, password } = req.body;
      console.log("user_email", user_email);
      console.log("password", password);

      if (!user_email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Find user by email
      const user = await userModel.findOne({ user_email });
      if (!user) {
        return res.status(404).json({ message: "User not found at authLogin" });
      }

      // Check if password is correct
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid password at authLogin" });
      }

      // if login successful, attach user to req object
      req.user = user; // Attach user to req object
      console.log("authlogin successfull");
      next(); // proceed to tokenCreation middleware

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error at authlogin" });
    }
  },  
  adminAuth: async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated in adminAuth" }, req.user);
    }
    try {
      const role = req.user.user_role || req.user.role;
      console.log("user role is", role);

  if (!["admin", "manager"].includes(role)) {
        req.user = null;
        return res
          .status(403)
          .json({ message: "Forbidden: Admin access required at adminAuth" });
      }
      console.log("adminAuth successfull");
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error at adminAuth" });
    }
  },
  tokenCreation: async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated in tokenCreation" });
    }
    try {
      // Define userLogin function
      const payload = {
        id: req.user._id,
        role: req.user.user_role,
      };

      // 3️⃣ Generate JWT token and set cookie
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      // Set token in HTTP-only cookie for 1 day
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 1,
      });
      
      console.log("tokken created successfully");
      return res.status(200).json({
        message: "User logged in successfully at tokenCreation",
        user: payload,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error at tokenCreation" });
    }
  },

};
