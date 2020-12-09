const {Router} = require('express')
//const admin = require('firebase-admin')
const Listaremision = require('../models/Listaremision')


const router = Router()

//const db = admin.firestore()


//obtener un dato
router.get('/api/listaremision/:id', (req, res) => {    
        let {id} = req.params
        Listaremision.findById(id)
        .exec()
        .then(x => res.status(200).send(x))
        .catch(error =>  res.status(500).json({'message':'No se encontro nada', "data":id}))         
    })

//obtener todos los datos
router.get('/api/listaremision', (req, res) => {       
        Listaremision.find()
        .exec()
        .then(x => res.status(200).send(x))
        .catch(error => res.status(500).send(error))   
   
})

router.post('/api/listaremision',  async (req, res) => {   
   const newLista = new Listaremision(req.body);
    await newLista.save();
    console.log(req.params)
    res.json({'message':'Saved successful', "data":req.body})  
})

router.delete('/api/listaremision/:id',async (req, res) => {
    let { id } = req.params;
    try{        
        await Listaremision.remove({_id: id});        
    } catch (error) {
        console.log(error)
       return res.status(500).json({"error existente al borrar: ": id})
   }

   return res.status(200).json()
})

router.delete('/api/listaremision/',async (req, res) => {
    try{        
        await Listaremision.remove();        
    } catch (error) {
        console.log(error)
       return res.status(500).json({"error: ": "no se pudo borrar la coleccion"})
   }   
   return res.status(200).json({"message:":"coleccion eliminada"})
 })

router.put('/api/listaremision/:id',async (req, res) => {
    let {id} = req.params

    try{        
        await Listaremision.update({_id: id}, req.body);
    } catch (error) {
        console.log(error)
       return res.status(500).json({"error: ": "no se pudo actualizar","data: ": id})
   }   
    
    return res.status(200).json({"message:":"actualizacion correcta"})
})

module.exports = router