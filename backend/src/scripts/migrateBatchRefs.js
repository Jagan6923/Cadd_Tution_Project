const mongoose = require("mongoose");
const Batch = require("../models/Batch");
const Course = require("../models/Course");
const User = require("../models/User");

mongoose.connect("mongodb+srv://caddproject:cadd1234@caddproject.ptzatgt.mongodb.net/?retryWrites=true&w=majority&appName=caddproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function migrateBatches() {
    try {
        const batches = await Batch.find();

        for (const batch of batches) {
            // Find the matching course and user by string ID
            const course = await Course.findOne({ _id: batch.courseId });
            const user = await User.findOne({ _id: batch.instructorId });

            if (!course || !user) {
                console.log(`Skipping batch: ${batch.name}, course or user not found`);
                continue;
            }

            batch.courseId = course._id;
            batch.instructorId = user._id;
            await batch.save();

            console.log(`Migrated batch: ${batch.name}`);
        }

        console.log("Migration complete!");
        mongoose.disconnect();
    } catch (error) {
        console.error("Migration failed:", error);
        mongoose.disconnect();
    }
}

migrateBatches();
