const { default: mongoose } = require("mongoose");

const storageSchema = new mongoose.Schema(
    {
        name: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Storage", storageSchema)