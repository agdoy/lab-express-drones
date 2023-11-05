const mongoose = require('mongoose')
const Drone = require('./../models/Drone.model')




const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
];

const connectionString = 'mongodb://127.0.0.1:27017/lab-express-drones'

mongoose
    .connect(connectionString)
    .then(x => {
        console.log(`✓ Conexion a BBDD Mongo: "${x.connections[0].name}"`)
        return Drone.create(drones) // seeding drones const
    })
    .then(dronesDB => {
        console.log(`✓ ${dronesDB.length} numero de drones creados`)
        return mongoose.connection.close()
    })
    .then(() => {
        console.log('Conexión finalizada.')
    })
    .catch(err => {
        console.log(`☒ Error Creando la BBDD ${err}`)

        mongoose.connection.close() // cierre de conexion con BBDD
    })