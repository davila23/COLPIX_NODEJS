var express = require('express');
var bodyParser = require('body-parser');
var User = require('./../models/user');
var router = express.Router();

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


    /* ------------------------------ Credential ------------------------------ */

    const poolData = {    
            UserPoolId : "us-east-2_7cSCfS17c",     
            ClientId : "7ru7ndpqm296s9lmre7hiq5kf2" 
         }; 

    const pool_region = 'us-east-2';    

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    let token = ''

    /* ------------------------------ Sing Up ------------------------------ */

    async function RegisterUser(req){
 
        var attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value: req.body.email}));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"nickname",Value: req.body.nickname}));
            
        await userPool.signUp( req.body.email, req.body.password , attributeList, null, function(error, result){
            if (error) {
                console.log(error);
                return error ;
            }
            cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            return cognitoUser;
        });
    }

    /* ------------------------------ Login   ------------------------------ */

    async function Login(user) {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username : user.body.email,
            Password : user.body.password,
        });
    
        var userData = {
            Username : user.body.email,
            Pool : userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        await cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('Acces Token : ' + result.getAccessToken().getJwtToken());
             //   console.log('id token + ' + result.getIdToken().getJwtToken());
             //   console.log('refresh token + ' + result.getRefreshToken().getToken());
            },
            onFailure: function(err) {
                console.log(err);
            },
    
        });
    }

    /* ------------------------------ Start Update ------------------------------ */

    function update(username, password){
        var attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "custom:scope",
            Value: "some new value"
        }));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({
            Name: "name",
            Value: "some new value"
        }));
  
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: username,
            Password: password,
        });

        var userData = {
            Username: username,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.updateAttributes(attributeList, (err, result) => {
            if (err) {
                //handle error
            } else {
                console.log(result);
            }
        });
    }

    /* ------------------------------ Start Token ------------------------------ */

     function ValidateToken(token) {
     request({
             url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
             json: true
     },  function (error, response, body) {
         return
        if (!error && response.statusCode === 200) {
            console.log("validate token");
            pems = {};
            var keys = body['keys'];
            for(var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent};
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }

            //validate the token
            var decodedJwt = jwt.decode(token, {complete: true});
            if (!decodedJwt) {
                console.log("Not a valid JWT token");
                return false;
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token');
                return false ;
            }

            jwt.verify(token, pem, function(err, payload) {
                if(err) {
                    console.log("Invalid Token.");
                    return false;

                } else {
                    console.log("Valid Token.");
                    console.log(payload);
                    return true;
                }
            });
        } else {
            console.log("Error! Unable to download JWKs");
         }
      });
     }

// ---------------------------------------------------------------------------  //
                 /* R O U T E S - S E T U P */
// ---------------------------------------------------------------------------  //


    //setup middleware
    router.use(function (req, res, next) {
    // console.log("request");
     next();
    });

    //Setup /api'/' - GET - WELCOME PAGE
    router.get('/', function (req, res) {
      res.sendFile('./index.html');
    });

    /* --------------------------------------------------------------------
        SING UP - (POST) - http://localhost:3000/api/singup
     --------------------------------------------------------------------*/
     router.route('/singup' ).post(function (req, res) {
        
        //fill variables with requested body
       
        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.name;
        var nickname = req.body.nickname;

   
       res.json(RegisterUser(req));

    })

    /* --------------------------------------------------------------------
       LOGIN - (POST) - http://localhost:3000/api/login
    ----------------------------------------------------------------------*/
    router.route('/login').post(async function (req, res) {
       
      //  var email = req.body.email;
      //  var password = req.body.password;
       
      var login = await Login(req);

      console.log("Login : " + login );
     
      res.json();
    })

/* -----------------------------------------    IMPLEMENTED CRUD METHODS   -----------------------------------------  */

    /* --------------------------------------------------------------------
       CREATE USER - (POST) - http://localhost:3000/api/users
     --------------------------------------------------------------------*/
   
     router.route('/users').post(async function (req, res) {
        
        var register = await RegisterUser(req);

        console.log("User register " + register);
        
        var users = new User();

        //Fill attributes with requested body

        users.name = req.body.name;
        users.email = req.body.email; 
        users.supervisorId = req.body.supervisorId;
        users.lastAccess =  new Date();
       
        //response
        users.save(function (error) {
            if (error)
                res.status(500).send('Failed to register new user. ERROR: ' + error);
                res.json({message: "User successfully registered"});
        });
    })

    /* ---------------------------------------------------------------------
         READ ALL USERS - (GET) - http://localhost:3000/api/users
    ---------------------------------------------------------------------*/
    .get(function (req, res) {
       
        let  insertToken = JSON.stringify(req.query.token);

        console.log("Insert token :" +  insertToken);

        var accesToken_= ValidateToken(req.query.token);

        if (insertToken === undefined) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        if (accesToken_ === "undefined") return res.status(401).send({ auth: false, message: 'Invalid token' });

        User.find(function (error, users) {
            if (error)
                res.status(500).send("Failed to show users. ERROR: " + error);
                res.json(users);
        });
    });
     
   /* ----------------------------------------------------------------------------------------
        READ ONE USER(by id) - (GET) - http://localhost:3000/api/users/user_id
    ----------------------------------------------------------------------------------------*/
    router.route('/users/:user_id').get(function (req, res) {
       
        let  insertToken = JSON.stringify(req.query.token);

        console.log("Insert token :" +  insertToken);

        var accesToken_= ValidateToken(req.query.token);

        if (insertToken === undefined) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        if (accesToken_ === "undefined") return res.status(401).send({ auth: false, message: 'Invalid token' });

        // console.log("Acces token " + JSON.stringify(accesToken_));
       
        User.findById(req.params.user_id, function (error, user) {
            if (error)
                res.status(500).send('error: ' + error);
            res.json(user);
        })
    })
    
    /* ---------------------------------------------------------------------------------------
         UPDATE USER(by id) - (PUT) - http://localhost:3000/api/users/user_id
    -----------------------------------------------------------------------------------------*/
    .put(function (req, res) {

        let  insertToken = JSON.stringify(req.query.token);

        console.log("Insert token :" +  insertToken);

        var accesToken_= ValidateToken(req.query.token);

        if (insertToken === undefined) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        if (accesToken_ === "undefined") return res.status(401).send({ auth: false, message: 'Invalid token' });

        //Serch a user by id - with id in req

        User.findById(req.params.user_id, function (error, user) {
            if (error)
                res.send('error: ' + error);
          
            // Update attributes of the user with req fields
            user.name = req.body.name;
            user.email = req.body.email;
            user.supervisorId = req.body.supervisorId;
            user.lastAccess =  new Date();
            
            // Save
            user.save(function (error) {
                if (error)
                    res.status(500).send('Failed to update user. ERROR: ' + error);
                res.json({message: 'User update successful!'});
            });
        });
    })

    /* ---------------------------------------------------------------------------------------
         (4) DELETE USER(by id) - (DELETE) - http://localhost:3000/api/users/user_id
     ----------------------------------------------------------------------------------------*/
     .delete(function (req, res) {

        let  insertToken = JSON.stringify(req.query.token);

        console.log("Insert token :" +  insertToken);

        var accesToken_= ValidateToken(req.query.token);

        if (insertToken === undefined) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        if (accesToken_ === "undefined") return res.status(401).send({ auth: false, message: 'Invalid token' });

        User.remove({
            _id: req.params.user_id
        }, function (error) {
            if (error)
                res.status(500).send('Unable to find user by id. Failed to remove. ERROR: ' + error);
            res.json({message: 'User deleted successful!'});
        });
    });

module.exports = router;