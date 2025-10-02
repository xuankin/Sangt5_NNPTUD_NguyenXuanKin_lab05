const User = require("../models/User");

// Create
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all + search
exports.getAllUsers = async (req, res) => {
  try {
    const { username, fullName } = req.query;
    const filter = { isDelete: false };
    if (username) filter.username = new RegExp(username, "i");
    if (fullName) filter.fullName = new RegExp(fullName, "i");
    const users = await User.find(filter).populate("role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("role");
    if (!user || user.isDelete)
      return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by username
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
      isDelete: false,
    }).populate("role");
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );
    res.json({ message: "Deleted successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify user (email + username)
exports.verifyUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    const user = await User.findOne({ email, username, isDelete: false });
    if (!user)
      return res.status(404).json({ error: "User not found or invalid info" });

    user.status = true;
    await user.save();
    res.json({ message: "User verified successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
