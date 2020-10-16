const Express = require ('express');
const connection = require('./src/database');
const User = require('./src/database/models/User.js');
const routes = require('./src/routes');
const app = Express();


User.init(connection);

app.use(Express.json());
app.use(routes);

app.get("/",(req,res)=>{
    res.json("cuidaaa");
})

app.listen(8184);
