const { default: mongoose } = require("mongoose");

const connectivitySchema = new mongoose.Schema(
    {
        name: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Connectivity", connectivitySchema)