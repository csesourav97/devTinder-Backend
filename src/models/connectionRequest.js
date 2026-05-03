const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    formUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true },
);

//compound db index
connectionRequestSchema.index({ formUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;
  if (connectionRequest.formUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!!");
  }

  // next(); //it was needed in earlier version
});

const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequestModel;
