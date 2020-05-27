import { AppPage } from './app.po';
import { browser, element, by } from "protractor";

describe('navigation from home', ()=>{
  let page: AppPage;

  beforeEach(() => {
    browser.restart()
    browser.get("/");
    page = new AppPage();
  });

  //Para un no-usuario no se puede acceder a las 
  //opciones y solo es posible login/registro
  it('can not go into manage for non user',async ()=>{
    let firstPath = await browser.getCurrentUrl()
    element(by.id('top')).click()
    browser.waitForAngular();
    let currentPath = await browser.getCurrentUrl()
    //Después de hacer click se mantiene en la misma página
    expect(currentPath).toEqual(firstPath)
  })

  it('can not go into play for non user',async ()=>{
    let firstPath = await browser.getCurrentUrl()
    element(by.id('bottom')).click()
    browser.waitForAngular();
    let currentPath = await browser.getCurrentUrl()
    //Después de hacer click se mantiene en la misma página
    expect(currentPath).toEqual(firstPath)
  })

  //Se permite:
  it('can go to login', async ()=>{
    element(by.xpath("//ion-label[(text()= 'Identificarse')]")).click().then(_=>{
      page.getPageTitle().then(title=>{
        expect(title).toEqual('Iniciar sesión')
      })
    })
  })

  it('can go to register',()=>{
    element(by.xpath("//ion-label[(text()= 'Registrarse')]")).click().then(_=>{
      page.getPageTitle().then(title=>{
        expect(title).toEqual('Registrarse')
      })
    })
  })

  it('can go to play and manage',async ()=>{
    //email: prueba@prueba.prueba
    //pass: prueba
    //nombre: prueba
    browser.ignoreSynchronization = true
    browser.get('login').then(_=>{
      element(by.css("ion-input[formControlName=email] input")).sendKeys('prueba@prueba.prueba');
      element(by.css("ion-input[formControlName=password] input")).sendKeys('prueba');
      //Solo hay un botón
      element(by.css('ion-button')).click().then(_=>{
        expect(element(by.id('top'))).toBeTruthy()
      })
    })
  })
})

describe('navigation from manage',()=>{
  let page: AppPage;

  beforeEach(() => {
    browser.get("/gestion");
    browser.ignoreSynchronization = true
    page = new AppPage();
  });

  it('can go home',async ()=>{
    let backButton = await element(by.css('ion-icon[name=arrow-back]'))
    browser.executeScript("arguments[0].click();", backButton.getWebElement());
    expect(element(by.id('top')).isPresent()).toBeTruthy();
  })

  it('can create game',()=>{
    element(by.xpath("//ion-label[(text()= 'CREAR JUEGO')]")).click().then(_=>{
      expect(element(by.xpath("//ion-card-header")).getText()).toEqual('Crear juego')
    })
    
  })
})

describe('navigation from play',()=>{
  let page: AppPage;
  beforeEach(() => {
    page = new AppPage();
  });

  it('can go home',()=>{
    browser.get("/participar/juegosDisponibles");
    //element(by.xpath("//ion-label[(text()= 'Inicio')]")).click()
    //element(by.css('ion-icon[name=home]')).click()
    //ion-buttons slot="end"
    element(by.css('ion-buttons[slot=end]')).click()
    browser.waitForAngular();
    expect(element(by.id('top')).isPresent()).toBeTruthy();
  })

  it('can go to available games',()=>{
    browser.get("/participar/juegosDisponibles").then(_=>{
        element(by.css('ion-title')).getAttribute("innerHTML").then(title=>{
          expect(title).toEqual('Juegos disponibles')
        })
      })
  })

  it('can go to played games',async()=>{
    element(by.id('tab-button-juegosCompletados')).click().then(_=>{
      browser.get("/participar/juegosCompletados").then(_=>{
          element(by.css('ion-title')).getAttribute("innerHTML").then(title=>{
            expect(title).toEqual('Juegos completados')
          })
        })
    })
  })

  it('can go to stadistics',async()=>{
    browser.get("/participar/estadisticas").then(_=>{
      element(by.css('ion-title')).getAttribute("innerHTML").then(title=>{
        expect(title).toEqual('Estadísticas')
      })
    })
  })
})
