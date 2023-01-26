/*
    Event Routes
    /api/events
*/

const {Router} = require('express')
const {check} = require('express-validator')

const {isDate} = require('../helpers/isDate')
const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/eventos')

const router = Router()

// Para no agregar el validado a cada petición como middleware puedo hacer lo siguiente:
router.use(validarJWT)
//De esta manera le estoy indicando que se pase a la validación a todas las peticiones que se encuentran después. 
// Si se requiriera tener algún que no utilice el validador la pondríamos arriba este ya que solo se aplica a las que están por debajo de este


//Todas tienen que pasar por la validación del JWT
//Obtener eventos
router.get('/', getEventos)

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
    )

//Actualizar Evento
router.put('/:id', actualizarEvento)

//Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router