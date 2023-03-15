import Message from "../models/messageModel.js";

const getMessages = async (socket, room) => {
  try {
    const messages = await Message.find({ room: room })
      .sort({ __createdTime__: 1 })
      .limit(50);
    if (messages) {
      console.log(messages);
      return messages;
    }
  } catch (err) {
    console.log(err);
  }
};

export default getMessages;
