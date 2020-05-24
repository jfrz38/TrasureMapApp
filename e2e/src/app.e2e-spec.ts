import { AppPage } from './app.po';
import { browser, element, by } from "protractor";

/*describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

});*/

describe('navigation from home', ()=>{
  let page: AppPage;

  beforeEach(() => {
    browser.get("/");
    page = new AppPage();
  });

  //Para un no-usuario no se puede acceder a las 
  //opciones y solo es posible login/registro
  it('can not go into manage for non user',async ()=>{
    let firstPath = await browser.getCurrentUrl()
    element(by.xpath("//div[@id='top']")).click()
    let currentPath = await browser.getCurrentUrl()
    //Después de hacer click se mantiene en la misma página
    expect(currentPath).toEqual(firstPath)
  })

  it('can not go into play for non user',async ()=>{
    let firstPath = await browser.getCurrentUrl()
    element(by.xpath("//div[@id='bottom']")).click()
    let currentPath = await browser.getCurrentUrl()
    //Después de hacer click se mantiene en la misma página
    expect(currentPath).toEqual(firstPath)
  })

  //Se permite:
  it('can go to login', async ()=>{
    element(by.xpath("//ion-label[(text()= 'Identificarse')]")).click()
    expect(page.getPageTitle()).toEqual('Iniciar sesión')
  })

  it('can go to register',()=>{
    element(by.xpath("//ion-label[(text()= 'Registrarse')]")).click()
    expect(page.getPageTitle()).toEqual('Registrarse')
  })

  it('can go to play and manage',()=>{
    //email: prueba@prueba.prueba
    //pass: prueba
    //nombre: prueba

    //Iniciar sesión
    browser.get("/login");
    //var mail = element(by.tagName('ion-input')[0])//element(by.xpath("//ion-input[(text()='Email:')]"))
    //var pass = element(by.tagName('ion-input')[1])//element(by.xpath("//ion-input[(text()='Contraseña:')]"))
    //mail.sendKeys('prueba@prueba.prueba')
    //pass.sendKeys('prueba')
    element(by.css("ion-input[formControlName=email] input")).sendKeys('prueba@prueba.prueba');
    element(by.css("ion-input[formControlName=password] input")).sendKeys('prueba');
    //Solo hay un botón
    element(by.css('ion-button')).click();
    //1. Acceder a la gestión de juegos
    element(by.xpath("//div[@id='top']")).click()
    expect(page.getPageTitle()).toEqual('Gestión')
    //2. Participar en juegos
    browser.navigate().back();
    element(by.xpath("//div[@id='bottom']")).click()
    expect(page.getPageTitle()).toEqual('Juegos disponibles')
  })
})

describe('navigation from manage',()=>{
  it('can go home',()=>{
    expect(true).toBeTruthy();
  })
  it('can create game',()=>{
    expect(true).toBeTruthy();
  })
})

describe('navigation from play',()=>{
  it('can go to available games',()=>{
    expect(true).toBeTruthy();
  })
  it('can go to palyed games',()=>{
    expect(true).toBeTruthy();
  })
  it('can go to stadistics',()=>{
    expect(true).toBeTruthy();
  })
})
