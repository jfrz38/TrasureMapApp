import { browser, by, element } from 'protractor';
import { resolve } from 'url';

export class AppPage {
  /*navigateTo() {
    return browser.get('/');
  }*/

  navigateTo(page = null){
    return page === null ? browser.get('/') : browser.get(page)
  }

  async login(){
    //Iniciar sesión
    //browser.get("/login");
    await this.navigateTo('/login')
    element(by.css("ion-input[formControlName=email] input")).sendKeys('prueba@prueba.prueba');
    element(by.css("ion-input[formControlName=password] input")).sendKeys('prueba');
    //Solo hay un botón
    element(by.css('ion-button')).click();
    //await this.navigateTo('/')
    //browser.driver.sleep(10000); 
    //browser.driver.sleep(10);
    browser.waitForAngular();
    //browser.driver.sleep(10000); 
  }
  getParagraphText() {
    return element(by.deepCss('app-root ion-content')).getText();
  }

  getPageTitle() {
    return new Promise<any>((resolve,reject)=>{
      //browser.driver.wait(_=>{
        element(by.css('ion-title')).getAttribute("innerHTML").then(title=>{
          resolve(title)
        })
      //})
      
    })
  }
}
