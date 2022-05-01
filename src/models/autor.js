const mongoose = require ('mongoose')

const autorSchema = new mongoose.Schema(
    {
        country: {
            type: String,
            trim: true,
            required: true
        },
        brithdate: {
            type: String,
            trim: true,
            required: true
        },
        deceased: {
            type: String,
            trim: true
        },
        genere: {
            type: String,
            trim: true,
            required: true
        },
        publishedBooks: [{
            book: {
                type: String,
                trim: true,
                required: true
            }
        }],
        awards: [{
            award: {
                type: String,
                trim: true,
            }
        }],
        review: {
            type: String,
            trim: true,
            required: true
        }
    }, {timestamps: true}
)

const Autor = mongoose.model('Autor', autorSchema)

module.exports = Autor