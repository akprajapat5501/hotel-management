const User = require("../model/user.model");
const jwt = require = ("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
        console.log(token);
        if (!token) {
            return res.status(400).json({ error: "token is not found" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(400).json({ error: "Unauthorized" });
        }
        req.user = user
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "token is not found" });
    }
}



module.exports = auth