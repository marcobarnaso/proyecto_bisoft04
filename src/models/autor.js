const mongoose = require ('mongoose')

const autorSchema = new mongoose.Schema(
    {
        picture: {
            type: String,
        },
        country: {
            type: String,
            trim: true,
            required: true
        },
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        birthDate: {
            type: String,
            trim: true,
            required: true
        },
        deceased: {
            type: String,
            trim: true
        },
        publishedBooks: {
            type: String,
            trim: true,
            required: true
        },
        awards: {
            type: String,
            trim: true,
            required: true
        },
        review: {
            type: String,
            trim: true,
            required: true
        }
    }, {timestamps: true}
)

const Autor = mongoose.model('Autor', autorSchema)

module.exports = Autor