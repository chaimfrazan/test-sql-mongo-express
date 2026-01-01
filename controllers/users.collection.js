export const createUsers = async (req, res) => {
  try {
    let count = 0;
    const { body } = req;
    const conn = req.mongoDbConn;
    const collection = conn.collection("users collection");
    if (!body.username || !body.password) {
      res.status(404).json({ massege: "you need password and name" });
    }
    const user = await collection.insertOne({
      username: body.username,
      password: body.password,
      encryptedMessagesCount: (count += 1),
      createdAt: new Date(),
    });
    const userFind = await collection.findOne({ username: body.username });
    res.status(201).json({ id: userFind._id, username: body.username });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "username with this name already exists",
      });
    }
  }
};

export const getProfile = async (req, res) => {
  try {
    const conn = req.mongoDbConn;
    const { body } = req;
    const collection = conn.collection("users collection");
    if (!body.username || !body.password) {
      res.status(404).json({ massege: "you need password and name" });
    }
    const userFind = await collection.findOne({ username: body.username });
    res
      .status(200)
      .json({
        username: userFind.username,
        encryptedMessagesCount: userFind.encryptedMessagesCount,
      });
  } catch (error) {
    res.status(404).json({ massege: "user not found" });
  }
};
