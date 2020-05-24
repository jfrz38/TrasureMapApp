import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DbService } from '../services/db.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { CalculatePointsService } from '../services/calculate-points.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {

  formValidation: FormGroup;
  errorMessage: string = '';

  formValidationMessages = {
    //PositionX
    'positionX': [
      { type: 'required', message: 'El campo es obligatorio.' },
      { type: 'min', message: 'La posición debe ser mayor de 0' }
    ],
    //PositionY
    'positionY': [
      { type: 'required', message: 'El campo es obligatorio.' },
      { type: 'min', message: 'La posición debe ser mayor de 0' }
    ],
  };

  constructor(private dbservice: DbService,
    public router: Router,
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute,
    private location: Location,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
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
      this.resetValues()
      this.getGameFromDB()
    }else if(this.type=='jugado') {
      //jugado
      this.game = JSON.parse(
        JSON.stringify(
          this.router.getCurrentNavigation().extractedUrl.queryParams))
    }else{
      //error
    }

  }

  resetValues(){
    this.formValidation = this.formBuilder.group({
      positionX: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(1),
      ])),
      positionY: new FormControl('', Validators.compose([
        Validators.min(1),
        Validators.required
      ])),
    });
  }
  getGameFromDB() {
    this.dbservice.getGame(this.id).then(res => {
      this.game = res;
    })
  }

  goBack() {
    this.location.back();
  }

  sendGame(value){
    var points=this.game.points;
    var response=[value.inputx,value.inputy]

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

