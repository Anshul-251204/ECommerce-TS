// import passport from "passport";
// import  GoogleStrategy from "passport-google-oauth2";
// import User from "../models/userModel.js";

// passport.use(
// 	new GoogleStrategy.Strategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID!,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// 			callbackURL: "http://yourdomain:3000/auth/google/callback",
// 			passReqToCallback: true,
// 		},
// 		function (request:string, accessToke:string, refreshToken:string, profile:any, done:any) {
// 			User.findOrCreate({ googleId: profile.id }, function (err, user) {
// 				return done(err, user);
// 			});
// 		}
// 	)
// );
