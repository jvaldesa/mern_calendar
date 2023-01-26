const {Schema, mode, model} = require('mongoose')

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})


// Para modificar como se muestran lo valores de la base de datos, en este caso se muestra asi:
/*
    {
        "ok": true,
        "evento": {
            "title": "Cumpleaños del jefe",
            "notes": "Comprar pastel",
            "start": "1970-01-01T00:00:00.001Z",
            "end": "1970-01-01T00:01:40.000Z",
            "_id": "63d2ab9103fbc72dac981a84",
            "user": "63caccf5be31b5254a07aae2",
            "__v": 0
        }
    }
*/
// queremos modificar para que no se muestre __v y en lugar de _id sea id

EventoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject()
    object.id = _id
    return object
})

/*
    Ahora tenemos:
    {
        "ok": true,
        "evento": {
            "title": "Cumpleaños del jefe",
            "notes": "Comprar pastel",
            "start": "1970-01-01T00:00:00.001Z",
            "end": "1970-01-01T00:01:40.000Z",
            "user": "63caccf5be31b5254a07aae2",
            "id": "63d2af787ebf2fd2dcda12c0"
        }
    }
    Esto no modifica la base de datos solo es a la hora de llamar el objeto toJSON
*/

module.exports = model('Evento', EventoSchema)