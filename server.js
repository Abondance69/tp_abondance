const cors = require("cors"),
    express           = require('express'),
    dotenv                          = require('dotenv'),
    path                = require('path');
dotenv.config({ path: path.resolve(__dirname, '.env')})

require('./app/models/user')
require('./app/models/todo')

const sequelize = require("./app/config/db");
const app = express()

app.use(cors({
    origin: '*',
    method: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT']
}))


app.use(express.urlencoded({extended: true}))
app.use(express.json())

require('./app/routes')(app)

app.get('/', (req, res) => {
    return res.status(200).send('Hello world')
})

app.use((req, res) => {
    return res.status(404).send('Not found')
})

app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, async (err) => {
    if(err){
        console.log('Error in server setup')
    }
    else {
        console.log(`Server running at http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
    }
})
