const app = require('./config/express');    

app.listen(process.env.PORT, () => {
    console.log(`API running at ${process.env.PORT}`);
});