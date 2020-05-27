import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {

  formValidation: FormGroup;
  errorMessage: string = '';
  formValidationMessages = {
    //Description
    'description': [
      { type: 'required', message: 'El campo es obligatorio.' },
      { type: 'minLength', message: 'La descripción debe tener al menos 10 caracteres.' },
      { type: 'maxLength', message: 'La descripción no puede tener tener más de 1000 caracteres.' }
    ],
    //Title
    'title': [
      { type: 'required', message: 'El campo es obligatorio.' },
      { type: 'minLength', message: 'El título debe tener al menos 3 caracteres.' },
      { type: 'maxLength', message: 'El título no puede tener tener más de 50 caracteres.' }
    ],
    //Points
    'points': [
      { type: 'required', message: 'El campo debe ser un número entre 1 y 100.' },
      { type: 'min', message: 'La puntuación no puede ser menor de 1.' },
      { type: 'max', message: 'La puntuación no puede ser mayor de 100.' }
    ],
    //Solution
    'solutionX': [
      { type: 'required', message: 'El campo es obligatorio.' },
      { type: 'minimumRange', message: "La solución debe ser un número mayor que 1" },
      { type: 'maximumRange', message: "La solución debe ser menor al tamaño máximo del mapa" }
    ],
    'solutionY': [
      { type: 'required', message: 'El campo es obligatorio.' },
      { type: 'minimumRange', message: "La solución debe ser un número mayor que 1" },
      { type: 'maximumRange', message: "La solución debe ser menor al tamaño máximo del mapa" }
    ],
    //Bound
    'boundX': [
      { type: 'required', message: 'El campo es obligatorio.' },
      { type: 'minimumRange', message: "El límite debe ser mayor que 1" },
      { type: 'maximumRange', message: "El límite debe ser mayor o igual que la solución" },
      { type: 'min', message: 'El límite no puede ser mayor de 100.' }
    ],
    'boundY': [
      { type: 'required', message: 'El campo es obligatorio.' },
      { type: 'minimumRange', message: "El rango debe ser mayor que 1" },
      { type: 'maximumRange', message: "El rango debe ser mayor o igual que la solución" },
      { type: 'min', message: 'El límite no puede ser mayor de 100.' }
    ]
  };

  constructor(public navCtrl: NavController,
    private activateRoute: ActivatedRoute,
    private dbservice: DbService,
    private location: Location,
    public router: Router,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    //private imagePicker: ImagePicker
    //private camera: Camera,
    public platform: Platform) { }

  formOK = false;
  photoEnabled = false;
  game = {
    description: '',
    points: 0,
    imageURL: '',
    solution: [0, 0],
    title: '',
    bound: [0, 0]
  }

  type: String;
  image: SafeResourceUrl;
  id: String;
  //cameraPhoto: CameraPhoto
  cameraPhoto = ''
  imageURL: string = ''

  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustUrl('../../assets/images/empty-image.png')
    this.type = this.activateRoute.snapshot.paramMap.get("type")
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    console.log("id = " + this.id)
    if (this.type == 'create' || this.type == 'propio') {
      if (this.id != '') {
        //propio
        this.getGameFromDB()

      }
    } 

    this.resetFields(this.type)
    this.formOK = true;

    //if (this.game.imageURL.startsWith('data')) this.photoEnabled = true;

  }

  getGameFromDB() {
    this.dbservice.getGame(this.id).then(res => {
      this.game = res;
      this.image = this.sanitizer.bypassSecurityTrustUrl(this.game.imageURL)
    })
  }

  resetFields(type) {
    if (type == 'create' || type == 'propio') {
      this.formValidation = this.formBuilder.group({
        imageCamera: new FormControl(''),
        image: new FormControl(''),
        description: new FormControl('', Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(1000),
          Validators.required
        ])),
        title: new FormControl('', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required
        ])),
        points: new FormControl('', Validators.compose([
          Validators.min(1),
          Validators.max(100),
          Validators.required,

        ])),
        solutionX: new FormControl('', Validators.compose([
          Validators.required,
          this.ValidateX
        ])),
        solutionY: new FormControl('', Validators.compose([
          Validators.required,
          this.ValidateY
        ])),
        boundX: new FormControl('', Validators.compose([
          Validators.min(1),
          Validators.max(100),
          Validators.required,
          this.ValidateBoundX
        ])),
        boundY: new FormControl('', Validators.compose([
          Validators.min(1),
          Validators.max(100),
          Validators.required,
          this.ValidateBoundY
        ]))
      });

    } else if (type == 'jugar') {

    } else {
      //error
    }

  }

  ValidateX(control: FormGroup): { [key: string]: boolean } | null {
    //Sin renderizar
    if (control.parent === undefined) return null
    if (control.value < 1) {
      return { minimumRange: true };
    } else if (control.value > control.parent.controls['boundX'].value) {
      return { maximumRange: true };
    } else {
      return null;
    }
  }

  ValidateY(control: FormGroup): { [key: string]: boolean } | null {
    //Sin renderizar
    if (control.parent === undefined) return null
    if (control.value < 1) {
      return { minimumRange: true };
    } else if (control.value > control.parent.controls['boundY'].value) {
      return { maximumRange: true };
    } else {
      return null;
    }
  }

  ValidateBoundX(control: FormGroup): { [key: string]: boolean } | null {
    //Sin renderizar
    if (control.parent === undefined) return null
    if (control.value < 1) {
      return { minimumRange: true };
    } else if (control.value < control.parent.controls['solutionX'].value) {
      return { maximumRange: true };
    } else {
      return null;
    }
  }

  ValidateBoundY(control: FormGroup): { [key: string]: boolean } | null {
    //Sin renderizar
    if (control.parent === undefined) return null
    if (control.value < 1) {
      return { minimumRange: true };
    } else if (control.value < control.parent.controls['solutionY'].value) {
      return { maximumRange: true };
    } else {
      return null;
    }
  }

  goBack() {
    this.location.back();
  }

  onSubmit(value) {
    if (this.photoEnabled) value.image = this.cameraPhoto//.dataUrl

    var gameToInsert = {
      description: value.description,
      points: value.points,
      imageURL: value.image,
      solution: [value.solutionX, value.solutionY],
      title: value.title,
      bound: [value.boundX, value.boundY]
    }
    if (this.type == 'propio') {
      this.editAlertController(gameToInsert)
      //return;
    }else{
      this.createAlertController(gameToInsert)
    }
    
  }

  createGame(gameToInsert) {
    this.dbservice.createGame(gameToInsert).then(_ => {
      this.router.navigate(["/gestion"]).then(() => {
        window.location.reload();
      });
    }).catch(_ => {
      this.errorMessage = "No se ha podido crear el juego"
    })
  }

  deleteGame() {
    this.dbservice.deleteGame(this.id).then(_ => {
      this.router.navigate(["/gestion"]).then(() => {
        window.location.reload();
      });
    }).catch(_ => {
      this.errorMessage = "No se ha podido eliminar el juego"
    })
  }

  editGame(gameToEdit) {
    this.dbservice.editGame(this.id, gameToEdit).then(_ => {
      this.router.navigate(["/gestion"]).then(() => {
        window.location.reload();
      });
    }).catch(_ => {
      this.errorMessage = "No se ha podido editar el juego"
    })
  }

  async takePhoto() {

    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });
    this.cameraPhoto = image.dataUrl;
    this.image = image.dataUrl

  }

  insertedURL() {
    if (this.imageURL == '') return;
    this.image = this.imageURL;
  }

  async createAlertController(gameToCreate){

    const alert = await this.alertController.create({
      header: '¡Cuidado!',
      message: 'Se va a crear el juego introducido',
      buttons:
        [

          {
            text: 'Cancelar',
            handler: () => {
              return;
            }
          },
          {
            text: 'OK',
            handler: () => {
              this.createGame(gameToCreate)
            }
          }
        ]
    });

    await alert.present();
  }

  async editAlertController(gameToEdit) {

    const alert = await this.alertController.create({
      header: '¡Cuidado!',
      message: '¿Seguro que desea editar el juego seleccionado?',
      buttons:
        [

          {
            text: 'Cancelar',
            handler: () => {
              return;
            }
          },
          {
            text: 'OK',
            handler: () => {
              this.editGame(gameToEdit)
            }
          }
        ]
    });

    await alert.present();
  }

  async deleteAlertController() {

    const alert = await this.alertController.create({
      header: '¡Cuidado!',
      message: '¿Seguro que desea eliminar el juego seleccionado?. Esta acción no se puede cancelar.',
      buttons:
        [

          {
            text: 'Cancelar',
            handler: () => {
              return;
            }
          },
          {
            text: 'OK',
            handler: () => {
              this.deleteGame()
            }
          }
        ]
    });

    await alert.present();
  }

}
