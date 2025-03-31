// routes/batchRoutes.js
const express = require("express");
const router = express.Router();
const Batch = require("../models/Batch");

// Get all batches
router.get("/", async (req, res) => {
    try {
        const batches = await Batch.find();
        res.json(batches);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch batches" });
    }
});

// Add a new batch
router.post("/", async (req, res) => {
    try {
        const newBatch = new Batch(req.body);
        await newBatch.save();
        res.json(newBatch);
    } catch (error) {
        res.status(500).json({ error: "Failed to add batch" });
    }
});

// Edit a batch
router.put("/:id", async (req, res) => {
    try {
        const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBatch) {
            return res.status(404).json({ message: "Batch not found" });
        }
        res.json(updatedBatch);
    } catch (error) {
        res.status(500).json({ error: "Failed to update batch" });
    }
});

// Delete a batch
router.delete("/:id", async (req, res) => {
    try {
        const deletedBatch = await Batch.findByIdAndDelete(req.params.id);
        if (!deletedBatch) {
            return res.status(404).json({ message: "Batch not found" });
        }
        res.json({ message: "Batch deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete batch" });
    }
});

module.exports = router;