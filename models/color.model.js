const { default: mongoose } = require("mongoose");

const colorSchema = new mongoose.Schema(
    {
        name: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Color", colorSchema)