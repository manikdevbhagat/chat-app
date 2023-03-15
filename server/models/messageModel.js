import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  __createdtime__: {
    type: Number,
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
