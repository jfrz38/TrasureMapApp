import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  getGamesCreated(id = null) {
    return new Promise<any>((resolve, reject) => {
      this.getUserData(id).then(user => {
        let games = []
        user.gamesCreated.forEach(async doc => {
          var game = await doc.get()
          const id = doc.id;
          const data = game.data();
          games.push({id,data})
        });
        resolve(of(games))
      },err => {
        reject(err);
      })
    })
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
      },err => {
        reject(err);
      })
    })
  }

  getGamesToPlay(id = null) {
    //Coger todos los juegos existentes MENOS los que estén en user.gamesPlayed
    return new Promise<any>(async (resolve, reject) => {
      var gamesPlayed = await this.getGamesPlayed(id).catch(error=>{
        return reject(error)
      })
      if(!gamesPlayed) return reject()
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
      resolve(newArray)
    })
  }

/*
  getGamesPlayed(id = null) {
    return new Promise<any>((resolve, reject) => {
      this.getUserData(id).then(user => {
        let games = []
        user.gamesPlayed.forEach(async doc => {
          var played={date:'',score:0,game:{},response:[]}
          played.date=doc.date;
          played.score=doc.score;
          played.response=doc.response
          var game = await doc.reference.get();
          played.game = game.data()
          games.push(played)
          --games.push(doc.reference.get().then(async game => {
          --  return new Promise<any>(res => {
          --    played.game = game.data()
          --    res(played)
          --  })
          --}))
        });
        resolve(of(games))
        //resolve(Promise.all(games))
      },err => {
        reject(err);
      })
    })
  }

  getGamesToPlay(id = null) {
    //Coger todos los juegos existentes MENOS los que estén en user.gamesPlayed
    return new Promise<any>(async (resolve, reject) => {
      var gamesPlayed = await this.getGamesPlayed(id).catch(error=>{
        return reject(error)
      })
      if(!gamesPlayed) return reject()
      var totalGames = (await firebase.firestore().collection('games').get()).docs.map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, data }
      })
      var newArray = []
      totalGames.forEach(total=>{
        var exists = false;
        gamesPlayed.forEach(played => {
          if(played === undefined) return;
          if (Object.entries(total.data).sort().toString() === 
          Object.entries(played.game).sort().toString()) {
            exists = true;
            return;
          }
        });
        if(!exists) newArray.push(total)
      })
      resolve(of(newArray))
    })
  }

  */
  getUserData(id = null) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        try{
          this.afs.collection('users').doc(id === null ? currentUser.uid : id).get().toPromise().then(doc => {
            resolve(doc.data())
          })
        }catch(error){
          reject(error);
        }
      })
    })
  }

  getGame(id) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('games').doc(id).get().toPromise().then(doc => {
        resolve(doc.data())
      },err => {
        reject(err);
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
        
      },err => {
        reject(err);
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
      },err => {
        reject(err);
      })
    })
  }

  editGame(id, newGame){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('games/').doc(id).update(newGame).then(_=>{
          resolve(true)
        },err => {
          reject(err);
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
      },err => {
        reject(err);
      })

    })
  }

  getCurrentUserID() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        resolve(currentUser.uid)
      },err => {
        reject(err);
      })
    })
  }
}