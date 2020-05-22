import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as util from 'util'
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { CalculatePointsService } from '../services/calculate-points.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

  constructor(private dbservice: DbService,
    public router: Router,
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute,
    private location: Location,
    public alertController: AlertController,
    private calculatePoints: CalculatePointsService) { }

  type: String;
  image: SafeResourceUrl;
  id: String;

  game = { 
    bound: [],
    description: '',
    imageURL: '',
    points: 0,
    solution: [],
    title: ''
   }

  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustUrl('../../assets/images/empty-image.png')
    this.type = this.activateRoute.snapshot.paramMap.get("type")
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    if (this.type == 'jugar') {
      this.getGameFromDB()
    }else {
      //jugado
      this.game = JSON.parse(
        JSON.stringify(
          this.router.getCurrentNavigation().extractedUrl.queryParams))
    }

  }

  getGameFromDB() {
    this.dbservice.getGame(this.id).then(res => {
      this.game = res;
    })
  }

  goBack() {
    this.location.back();
  }

  sendGame(inputx, inputy){
    var points=this.game.points;
    var response=[inputx,inputy]
    //Calcular puntuación
    this.calculatePoints.calculatePoints(this.game.solution, 
      response, this.game.points).then( result =>{
        this.presentAlert(result, points,this.game.solution, response)
        //Insertar en la BD
        this.dbservice.gameFinished(this.id, response, result);
    })
    
  }

  async presentAlert(score, points, solution, response) {

    const alert = await this.alertController.create({
      header: 'Juego enviado',
      message:
      `
      <p> ¡Gracias por jugar! </p>
      <p> Estos han sido tus resultados: </p>
      <p> El tesoro estaba en ${solution[0]}, ${solution[1]} </p>
      <p> Has seleccionado ${response[0]}, ${response[1]}  </p>
      <p> Has conseguido ${score}/${points} puntos </p>
      `,
      buttons: 
      [
        {
          text: 'OK',
          handler: ()=>{
            this.router.navigate(["/participar/juegosCompletados"]).then(() => {
              window.location.reload();
            });
          }
        }
      ]
    });
    
    await alert.present();
  }
}

