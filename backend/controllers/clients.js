const Client = require('../models/Client')

//contrôleur de la route GET /clients
exports.getList = (req, res) => {
  Client.find().then((clients) => {
    res.status(200).json(clients)
  }).catch(error => res.status(400).json({ error }))
}

//contrôleur de la route GET /clients/:id
exports.getItem = (req, res) => {
  Client.findOne({
    _id: req.params.id
  }).then((client) => {
    res.status(200).json(client)
  }).catch(error => res.status(400).json({ error }))
}

//contrôleur de la route POST /clients/
exports.postItem = (req, res) => {
  console.log(req.body)
  if(!req.body.firstname || !req.body.lastname) {
    res.status(400).json({ error: 'Les paramètres nom et prénom sont obligatoires.' })
  }
  const client = new Client({
    ...req.body
  })
  client.save().then(() => {
    res.status(201).json({
      message: 'Client crée !'
    })
  }).catch(error => res.status(400).json({ error }))
}

//contrôleur de la route PATCH /clients/:id
exports.patchItem = (req, res) => {
  const id = req.params.id
  const client = req.body
  Client.findByIdAndUpdate( {_id: id }, client, (err, clientUpdated) => {
    if (err) res.status(400).json(err)
    else  res.status(201).json(clientUpdated)
  } )
}

//contrôleur de la route PUT /clients/:id
exports.putItem = (req, res) => {
  const id = req.params.id
  const client = req.body
  Client.updateOne( {_id: id }, client).then(()=>{
    res.status(201).json({
      message: 'Client mis à jour !'
    })
  })
}

//contrôleur de la route DELETE /clients/:id
exports.deleteItem = (req, res) => {
  Client.deleteOne({
    _id: req.params.id
  }).then((client) => {
    res.status(201).json({
      message: 'Client supprimé !'
    })
  }).catch(error => res.status(400).json({ error }))
}
