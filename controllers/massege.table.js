export const createMessage = async (req, res) => {
  try {
    const { body } = req;
    const connMon = req.mongoDbConn;
    const connSql = req.mysqlConn;
    const collection = connMon.collection("users collection");
    if (!body.username || !body.password || !body.message || !body.cipherType) {
      res.status(404).json({ massege: "error" });
    }
    const user = await collection.findOne({
      username: body.username,
      password: body.password,
    });
    if (!user) {
      res.status(404).json({ massege: "the user not found" });
    }
    let reversedStr = body.message.split("").reverse().join("").toUpperCase();
    const [result] = await connSql.query(
      `INSERT INTO message (username, cipher_type, encrypted_text)
       VALUES (?, ?, ?)`,
      [user.username, body.cipherType, reversedStr]
    );
    res.status(200).json({ massage: "added db sucssesfuly" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error", error: error.message });
  }
};

export const decryptMessage = async (req, res) => {
  try {
    const { body } = req;
    const connMon = req.mongoDbConn;
    const connSql = req.mysqlConn;
    const collection = connMon.collection("users collection");
    if (!body.username || !body.password || !body.messageId) {
      res.status(404).json({ massege: "error" });
    }
    const user = await collection.findOne({
      username: body.username,
      password: body.password,
    });
    if (!user) {
      res.status(404).json({ massege: "the user not found" });
    }
    const [result] = await connSql.query(
      `SELECT * FROM message WHERE id = (?)`,
      [body.messageId]
    );
    const decrypt = result.encrypted_text
      .split("")
      .reverse()
      .join("")
      .toUpperCase();
    res.status(200).json({ id: result.id, decryptedText: decrypt });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error", error: error.message });
  }
};
