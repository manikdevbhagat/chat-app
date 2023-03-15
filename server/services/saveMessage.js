import Message from "../models/messageModel.js";

const saveMessage = async (data) => {
  try {
    const message = await Message.create(data);
    if (message) {
      console.log(message);
      return message;
    }
  } catch (err) {
    console.log(err);
  }
};

export default saveMessage;
