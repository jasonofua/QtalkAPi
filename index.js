const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const firebase = require("firebase");


const firebaseConfig = {
    apiKey: "AIzaSyBo4Oe2vjSBbp9JV3KI39_d6JYIPHvk9Pc",
    authDomain: "nfcs-7ab10.firebaseapp.com",
    databaseURL: "https://nfcs-7ab10.firebaseio.com",
    projectId: "nfcs-7ab10",
    storageBucket: "nfcs-7ab10.appspot.com",
    messagingSenderId: "641366240655",
    appId: "1:641366240655:web:84953e9b8472362bbc6ffa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  exports.createUser = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
      if(req.method !== 'POST') {
        return res.status(401).json({
          message: 'Not allowed'
        })
      }
      console.log(req.body)
    
    //  const {email,password,bio,username,phone,designation,gender,imageUrl,token,type} = req.body;
      const email = req.body.email
      const passwordUser = req.body.password
      const bio = req.body.bio
      const username = req.body.username
      const phone = req.body.phone
      const designation = req.body.designation
      const gender = req.body.gender
      const imageUrl = req.body.phone
      const type = req.body.phone
      const token = req.body.token

      console.log(email);
      console.log(passwordUser);
      
       
      
     return firebase.auth().createUserWithEmailAndPassword(email, passwordUser)
      .then(function(userRecord) {
          
        if (userRecord) {
          //  console.log('Successfully created new user:', userRecord.uid);
          const database = firebase.database().ref('Users/').child(userRecord.user.uid);
       
        return  database.set({ email, bio, username, phone, designation, gender,imageUrl,type,token })
           .then(
                 database.once('value')
                 .then(function(snapshot) {
     
                 console.log(snapshot.val());
                          
                 return  res.status(200).json(snapshot.val())
                 }, (error) => {
                return   res.status(400).json({
                     message: ` ${error.message}`
                   })
               
                 })
             
         
         ).catch(function(error) {
           console.log('write',error.code)
           return res.status(400).json({
             message: `${error.message}`
           })
       
         }
     
         );
           
            // User is signed in.
          } else {
            return res.status(419).json({
                message : `not signed in`
            })
            // No user is signed in.
          }
        
    
        })
        .catch(function(error) {
          // Handle Errors here.
          if(error.code === "auth/email-already-in-use"){
            console.log('for auth ',error.code)
         return   res.status(400).json({
              message: `email areadly exist`
            })
          }else
          
         return res.status(400).json({
            message: `${error.message}`
          })
      
        });
        
              
     
  
      
    })
  })


   exports.createUser = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
      if(req.method !== 'POST') {
        return res.status(401).json({
          message: 'Not allowed'
        })
      }
      console.log(req.body)
    
    //  const {email,password,bio,username,phone,designation,gender,imageUrl,token,type} = req.body;
      const email = req.body.email
      const passwordUser = req.body.password
      const bio = req.body.bio
      const username = req.body.username
      const phone = req.body.phone
      const designation = req.body.designation
      const gender = req.body.gender
      const imageUrl = req.body.phone
      const type = req.body.phone
      const token = req.body.token

      console.log(email);
      console.log(passwordUser);
      
       
      
     return firebase.auth().createUserWithEmailAndPassword(email, passwordUser)
      .then(function(userRecord) {
          
        if (userRecord) {
          //  console.log('Successfully created new user:', userRecord.uid);
          const database = firebase.database().ref('Users/').child(userRecord.user.uid);
       
        return  database.set({ email, bio, username, phone, designation, gender,imageUrl,type,token })
           .then(
                 database.once('value')
                 .then(function(snapshots) {

                    const databaseUserName = firebase.database().ref('username/').child(username);

                    return databaseUserName.set({email})
                    .then(
                        databaseUserName.once('value')
                        .then(function(snapshot){


                           return firebase.auth().currentUser.sendEmailVerification()
                            .then(function() {
                                console.log(snapshot.val());
                                return  res.status(200).json({
                                    code : 200,
                                    data :snapshots.val()
                                })
      
                                })
                            .catch(function(error) {
                                return   res.status(error.code).json({
                                    message: ` ${error.message}`
                                  })
 
                              });
                        
                           

                        }).catch(function(error){
                            return   res.status(error.code).json({
                                message: ` ${error.message}`
                              })

                        })

                    ).catch(function(error){
                        return   res.status(error.code).json({
                            message: ` ${error.message}`
                          })

                    });
     
                
                          
                 
               
                 })
             
         
         ).catch(function(error) {
           console.log('write',error.code)
           return res.status(400).json({
             message: `${error.message}`
           })
       
         }
     
         );
           
            // User is signed in.
          } else {
            return res.status(419).json({
                message : `not signed in`
            })
            // No user is signed in.
          }
        
        

        })
        .catch(function(error) {
          // Handle Errors here.
          if(error.code === "auth/email-already-in-use"){
            console.log('for auth ',error.code)
         return   res.status(400).json({
              message: `email areadly exist`
            })
          }else
          
         return res.status(400).json({
            message: `${error.message}`
          })
      
        });
        
              
     
  
      
    })
  })


  exports.loginUser = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
      if(req.method !== 'POST') {
        return res.status(401).json({
          message: 'Not allowed'
        })
      }
      console.log(req.body)
    
      const email = req.body.email
      const password = req.body.password
   
   return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully created new user:', userRecord.uid);
        const uid = userRecord.uid;
        const database = firebase.database().ref('user/').child(uid);
       
        
       return database.once('value')
        .then(function(snapshot) {
        console.log(snapshot.val());    
        return res.status(200).json(snapshot.val())
        }, (error) => {
          return res.status(400).json({
            message: `${error.message}`
          })
      
        })
    
        })
  
      .catch(function(error) {
        // Handle Errors here.
        if(error.code === "auth/user-not-found"){
       return  res.status(404).json({
            message: `User not found`
          })
        }else{
        
       return res.status(400).json({
          message: ` ${error.message}`
        })
      }
    })
    })
      
    })

    exports.getUsers = functions.https.onRequest((req, res) => {
        return cors(req, res, () => {
          if(req.method !== 'GET') {
            return res.status(401).json({
              message: 'Only GET method allowed'
            })
          }
          console.log(req.body)
          const userDatabase = firebase.database().ref('Users');

          return userDatabase
          .once('value').then(function(snapshot){
            console.log(snapshot.val());
            return  res.status(200).json({
                code : 200,
                data :snapshot.val()
            })

          }).catch(function(error){
                return   res.status(error.code).json({
                 message: ` ${error.message}`
             })

            })
        
        })
          
        })
  
