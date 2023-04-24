const express =  require('express')
const dotenv = require('dotenv')
const cors =  require('cors')

const clientControllers =  require('./controllers/clientControllers')
const articleControllers =  require('./controllers/articleControllers')
const invoiceControllers =  require('./controllers/invoiceControllers')
const invoiceLineControllers = require('./controllers/invoiceLineControllers')


dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())
app.use('/pictures', express.static('pictures'));


// Base route
app.get('/api/', function (req, res, next) {
    res.send("Ecommerce API")
})

// Routers
app.use('/api/clients', clientControllers)
app.use('/api/articles', articleControllers)
app.use('/api/invoices', invoiceControllers);
app.use('/api/invoicelines', invoiceLineControllers);



const PORT = process.env.PORT || '4000';
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})