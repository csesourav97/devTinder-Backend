const adminAuth = (req, res, next) => {
  console.log("admin Auth checked !!!");
  const token = "xyz";
  const isAdminAuthorized = token === "xyzabc";

  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = { adminAuth };
