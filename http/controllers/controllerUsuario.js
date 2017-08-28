var db = require('../relations');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../../conf/oauth.js');
var usuario = db.usuario;
var secret  = 'Glowing';

var ex = module.exports = {};

passport.serializeUser(function(user, done) {

    var serializeData = {
        userId: user.id,
        username: user.nombre,
        email: user.correo,
    };

    token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

    done(null, serializeData);

});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

ex.create = function (req, res, next) {

    var data = req.body;

    // console.log(data);

    usuario.create(data)
    .then(function () {
        res.status(200).jsonp(req.body);
    });
};


ex.token = function (req, res, next) {

    var token = req.body.token;

    if(token){

        jwt.verify(token, secret, function(err, decoded){

            if(err){
                res.json({success : false, message: 'token invalid'})
            }else{
                res.json(decoded)
            }

        });


    }else{
        res.json({success : false, message: 'token provided'})
    }
};

ex.read = function (req, res, next) {

    var id = req.params.id;

    if (id) {
        usuario.findById(id)
                .then(function (usuario) {
                    res.status(200).jsonp(usuario);
                });
    } else {
        usuario.findAll()
                .then(function (usuarios) {
                    res.status(200).jsonp(usuarios);
                });
    }
};

ex.login = function (req, res, next) {

    var data = req.body;
    // console.log(req.body);

    passport.authenticate('login', function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send({ success: false, message: 'Incorrect username or password.' });
		}

		req.login(user, function(err) {
			if (err) { return next(err); }

            var token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
			return res.send({ success: true, message: 'Authentication succeeded', user: user, token: token});
		});
	})(req, res, next);

};

ex.facebook = function(req, res, next) {
    passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
}

ex.facebookcallback = function(req, res, next) {
  passport.authenticate('facebook',{
        successRedirect: '/token',
        failureRedirect : '/'
    })(req, res, next);
}



// ex.facebookcallback = function(req, res, next) {
//   passport.authenticate('facebook', {failureRedirect : '/'}), function(req, res) {
//
//     console.log('si se puede')
//
//    res.redirect('/');
//  };
// }

// ex.facebookcallback = function(req, res, next) {
//     passport.authenticate('facebook', { failureRedirect: '/' }),
//     function(req, res) {
//       res.redirect('/user');
//     }
// }

ex.registro = function (req, res, next) {

    var data = req.body;

    // console.log(req.body);

    passport.authenticate('registro', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({success: false, message: info});
        }

        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            var token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
            return res.send({ success: true, message: 'Authentication succeeded', user: user, token: token});
        });
    })(req, res, next);

};


passport.use('login', new localStrategy({

    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true

    },function(req, username, password, done) {
        usuario.findOne({ // Using sequelize model function
            where: { // Take an object with options where self explanatory
                'correo': username
            }
        }).then(function(user) { // Sequelize return a promise with user in callback
            if (user == null) { // Checking if user exsists
                return done(null, false) // Standerd Passport callback
                console.log('no se encontro un usuario');
            }

            if (password == user.password) { // use your password hash comparing logic here for security
                return done(null, user) // Standard Passport callback
            }
            return done(null, false) // Standerd Passport callback
        })
}))

passport.use('registro', new localStrategy({
        usernameField: 'correo',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        usuario.find({
            where: {
                'correo': username
            }
        }).then(function(user) {
            if (user) {
                // console.log('Ya se ha registrado el correo anteriormente');
                return done(null, false);
            } else {

                var data = req.body;
                usuario.create(data).then(function(user) {
                    return done(null, user);

                }, function(err) {
                    throw err;
                });
            }
        }, function(err) {
            done(err, null);
        });
    })
);

passport.use('facebook', new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: [
        'id',
        'emails',
        'displayName',
        'picture',
        'cover',
        'first_name',
        'last_name',
        'locale',
        'gender',
        'hometown'
    ]
}, function(accessToken, refreshToken, profile, done) {
    // console.log(profile);
    process.nextTick(function() {
        usuario.find({
            where: {
                'fb_id': profile.id
            }
        }).then(function(user) {
            if (user) {
                done(null, user);
            } else {

                var nombre = profile.displayName;
                var correo = profile.displayName;

                if (profile.name.givenName != undefined) {
                    nombre = profile.name.givenName;
                }

                if (profile.emails != undefined) {
                    if (profile.emails.length > 0) {
                        correo = profile.emails[0].value;
                    }
                }

                var nuevousuario = {
                    nombre: nombre,
                    correo: correo,
                    fb_id:  profile.id,
                }

                usuario.create(nuevousuario).then(function(user) {

                    return done(null, user);

                }, function(err) {
                    throw err;
                });
            }
        }, function(err) {
            return done(err);
        });
    });
}));
