import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import * as util from 'util'
import { utils, element } from 'protractor';
import { resolveCname } from 'dns';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  /*getUser() {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.user.subscribe(currentUser => {
        //this.snapshotChangesSubscription = this.afs.collection('users').doc(currentUser.uid).snapshotChanges();
        this.afs.collection('users').doc(currentUser.uid).get().toPromise().then(doc => {
          resolve(doc.data());

        })
      })
    })
  }*/

  getGamesCreated(id = null) {
    return new Promise<any>((resolve, reject) => {

      this.getUserData(id).then(snapshot => {
        let games = []
        snapshot.gamesCreated.forEach(async doc => {

          games.push(doc.get().then(game => {
            return new Promise<any>(res => {
              const id = doc.id;
              const data = game.data();
              res({ id, data })
            })
          }))
        });
        resolve(Promise.all(games))
      })

      /*this.getUserData(id).then(snapshot => {
        let games = []
        snapshot.gamesCreated.forEach(doc => {
          console.log("AA")
          games.push(doc.reference.get().then(game => {
            return new Promise<any>(res => {
              res(game.data())
            })
          }))
        });
        resolve(Promise.all(games))
      })*/
    })





    /*return new Promise<any>((resolve, reject) => {
    this.afAuth.user.subscribe(currentUser => {
      this.afs.collection('users').doc(id===null ? currentUser.uid : id).get().toPromise().then(doc=>{
        let games = []
        if(doc.data()!==undefined){
          doc.data().gamesCreated.forEach(game => {
            games.push(this.getGame(game))
          });
        }
        resolve(Promise.all(games))
      })
    })
  })*/
  }

  getGamesPlayed(id = null) {
    return new Promise<any>((resolve, reject) => {
      this.getUserData(id).then(snapshot => {
        let games = []
        snapshot.gamesPlayed.forEach(async doc => {
          var played={date:'',score:0,game:{},response:[]}
          played.date=doc.date;
          played.score=doc.score;
          played.response=doc.response
          games.push(doc.reference.get().then(game => {
            return new Promise<any>(res => {
              played.game = game.data()
              res(played)
            })
          }))
        });
        resolve(Promise.all(games))
      })
    })
  }

  getGamesToPlay(id = null) {
    //Coger todos los juegos existentes MENOS los que estén en user.gamesPlayed
    return new Promise<any>(async (resolve, reject) => {
      var gamesPlayed = await this.getGamesPlayed(id)
      var totalGames = (await firebase.firestore().collection('games').get()).docs.map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, data }
      })
      var newArray = []
      totalGames.forEach(total=>{
        var exists = false;
        gamesPlayed.forEach(played => {
          if (Object.entries(total.data).sort().toString() === 
          Object.entries(played.game).sort().toString()) {
            exists = true;
            return;
          }
        });
        if(!exists) newArray.push(total)
      })
      /*var newArray = totalGames.filter(function (item) {
        var newList = []
        if (gamesPlayed.length > 0) {
          
          for (var i = 0; i < gamesPlayed.length; i++) {
            if (Object.entries(gamesPlayed[i].game).sort().toString() === Object.entries(item.data).sort().toString()) {
              gamesPlayed.splice(i, 1);
              i--;
              return false;
            } else {
              newList.push(gamesPlayed[i].game)
            }
          }
        } else {
          return newList;
        }
      })*/
      resolve(newArray)
    })

    /*return new Promise<any>(async (resolve, reject) => {
      //Juegos terminados por el usuario
      var userGamesPlayed = await this.getUserData(id)
      userGamesPlayed = userGamesPlayed.gamesPlayed
      //console.log("gp = " + JSON.stringify(userGamesPlayed))
      //Juegos totales en la BD
      const db = await firebase.firestore().collection('games').get()
      var results = []
      //Filtrar los juegos que no hayan sido jugados
      db.docs.map(doc => {
        if (!userGamesPlayed.includes(doc.id)) {
          results.push(doc.data())
        }
      })
      resolve(results)
    })*/
  }

  getUserData(id = null) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        this.afs.collection('users').doc(id === null ? currentUser.uid : id).get().toPromise().then(doc => {
          resolve(doc.data())
        })
      })
    })
  }

  getGame(id) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('games').doc(id).get().toPromise().then(doc => {
        resolve(doc.data())
      })
    })
  }

  deleteGame(id){
    //Eliminar el juego y la referencia en el usuario
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('games/').doc(id).delete().then(del=>{
        this.getCurrentUserID().then(userId=>{
          this.getUserData(userId).then(user=>{
            firebase.firestore().doc('users/' + userId)
                .update(
                  'gamesCreated', user.gamesCreated.filter(g => g.id !== id)).then(_=>{
                    resolve(true)
                  })
          })
        })
        
      })
    })
  }

  gameFinished(gameId, response, score){
    //Añadir el juego a completado
    return new Promise<any>((resolve, reject) => {
      this.getCurrentUserID().then(userId=>{
        this.getUserData(userId).then(_=>{
              var gamePlayed = {
                date: new Date().toISOString().slice(0,10),
                reference: this.afs.doc('games/'+gameId).ref,
                response: response,
                score: score
              }  
              firebase.firestore().doc('users/' + userId)
              .update(
                //Agregar partida al array
                'gamesPlayed',
                firebase.firestore.FieldValue.arrayUnion(gamePlayed),
                //Sumar puntos
                'puntos',
                firebase.firestore.FieldValue.increment(score)).then(_=>{
                  
                    resolve(true)
                  
                })
            })
      })
    })
  }

  editGame(id, newGame){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('games/').doc(id).update(newGame).then(_=>{
          resolve(true)
        })
    })
  }

  unsubscribeOnLogOut() {
    this.snapshotChangesSubscription.unsubscribe();
  }

  createUser(insertUser, email, pass) {

    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, pass).then(function (user) {
        firebase.firestore().collection('users/').doc(user.user.uid).set(insertUser)
          resolve(user)
      })
        .catch(function (error) {
          console.log("errorCode = " + error.code)
          console.log("errorMesage = " + error.message)
          reject(error)
        })
    })
  }

  createGame(game) {
    return new Promise<any>((resolve, reject) => {
      //Añadir juego a la BD
      this.afs.collection('games/').add(game).then(gameAdded => {
        //Coger referencia del juego añadido
        gameAdded.get().then(gameReference => {
          this.getCurrentUserID().then(id => {
            //Añadir referencia al usuario
            firebase.firestore().doc('users/' + id)
              .update(
                'gamesCreated',
                firebase.firestore.FieldValue.arrayUnion(gameReference.ref)).then(_=>{
                  resolve(true)
                })
          })
        })
      })

    })
  }

  addGamePlayed(){
    
  }

  getCurrentUserID() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        resolve(currentUser.uid)
      })
    })
  }

  //Photos
  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child('gameID');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

}