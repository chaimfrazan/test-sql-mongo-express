
export const createUsers = async (req, res) => {
  try {
    const { body } = req;
    const conn = req.mongoDbConn;
    const collection = conn.collection("users");
    if (!body.username || !body.password) {
      res.status(404).json({ massege: "you need password and name" });
    }

    // console.log(body)
    const user = await collection.insertOne({
      username: body.username,
      password: body.password,
      encryptedMessagesCount: 0,
      createdAt: new Date(),
    });
    const userFind = await collection.findOne({ username: body.username });
    console.log(userFind)
    res.status(201).json({ id: userFind._id, username: body.username });
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({ message: "server error", error: error.message });
    }
  }
};

export const getProfile = async (req, res) => {
  try {
    const conn = req.mongoDbConn;
    const { body } = req;
    const collection = conn.collection("users");
    if (!body.username || !body.password) {
      res.status(404).json({ massege: "you need password and name" });
    }
    const userFind = await collection.findOne({ username: body.username });
    res.status(200).json({
      username: userFind.username,
      encryptedMessagesCount: userFind.encryptedMessagesCount,
    });
  } catch (error) {
    res.status(404).json({ massege: "user not found" });
  }
};
