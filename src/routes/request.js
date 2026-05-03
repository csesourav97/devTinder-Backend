const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const formUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //status type checking , either ignored or interested
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type " + status });
      }

      //If toUserId does not present in DB

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User does not exist !!" });
      }

      // If connection request already exixt
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { formUserId, toUserId },
          { formUserId: toUserId, toUserId: formUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Requestt Already Exists!!!" });
      }

      const connectionRequest = new ConnectionRequest({
        formUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR :" + err.message);
    }
  },
);

module.exports = requestRouter;
