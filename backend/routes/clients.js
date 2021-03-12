const express = require('express')
const router = express.Router()

//middleware
const verifyParams = require('../middleware/verifyParams')

//importer les fonctions du contrôleur des routes pour clients/
const ctrl = require('../controllers/clients')

// route /clients/
router.get('/', ctrl.getList )

// route /clients/:id
router.get('/:id', verifyParams, ctrl.getItem)
router.post('/', ctrl.postItem)
router.put('/:id', verifyParams, ctrl.putItem)
router.patch('/:id', verifyParams, ctrl.patchItem)
router.delete('/:id', verifyParams, ctrl.deleteItem)

module.exports = router