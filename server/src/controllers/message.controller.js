const handleSendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const senderId = req.user._id;

    res.send("send message", message);
  } catch (error) {
    next(error);
  }
};

export default {
  handleSendMessage,
};
