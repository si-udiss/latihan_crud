const express = require('express');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended:true,
}));
app.use(bodyParser.json());

const usersRouter = require('./routers/users.router.js');

app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});