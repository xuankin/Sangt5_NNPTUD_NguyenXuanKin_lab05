const Role = require("../models/Role");

// Create
exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all + search
exports.getAllRoles = async (req, res) => {
  try {
    const { name } = req.query;
    const filter = { isDelete: false };
    if (name) filter.name = new RegExp(name, "i");
    const roles = await Role.find(filter);
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by id
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role || role.isDelete)
      return res.status(404).json({ error: "Not found" });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soft delete
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );
    res.json({ message: "Deleted successfully", role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
