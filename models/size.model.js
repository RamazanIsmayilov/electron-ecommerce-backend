const { default: mongoose } = require("mongoose");

const sizeSchema = new mongoose.Schema(
    {
        name: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Size", sizeSchema)