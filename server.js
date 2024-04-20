const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.static('apps'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//secret key for jwt token
const secretKey = 'secret_key';

// Generates TOken 
function generateToken(email) {

    return jwt.sign({email}, secretKey, {expiresIn: '10m'});
}


app.post('/login', (req, res) => {
    const {email, password} = req.body;

    //verify cred
    if (email === '2209078@upy.edu.mx' && password === Segoso2004) {
    const token = generateToken(email); 

    //cookie to stablish token
    res.cookie('token', token, {httpOnly: true});

    res.redirect('/dashboard');
     }   else {
        res.status(401).send('Invalid email or password. Please try again ');
    }
    

});

//Dashboard route
app.get('/dashboard', (req, res) => {

    //verify is cookie token is available
    if (req.cookies.token) {
    //if token available redirec to dashboard.
    res.sendFile(path.join(__dirname, 'apps', 'dashboard.html'));
    } else {
    //If token not available redirect to login page
    res.redirect('/')
    }
})

//Homepage route
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'apps', 'index.html'));
})

//Server's Port: 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
