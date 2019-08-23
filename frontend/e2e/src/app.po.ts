// import { browser, by, element } from 'protractor';

// export class AppPage {
//   navigateTo() {
//     return browser.get(browser.baseUrl) as Promise<any>;
//   }

//   getTitleText() {
//     return element(by.css('app-root h1')).getText() as Promise<string>;
//   }



// }

import { browser, by, element } from 'protractor';

export class AppPage {
 
  private credentias = {
    username: 'admin',  //username e password con cui si fa l'accesso
    password: 'admin'
  };

  navigateTo() {
    return browser.get('/login'); //login è il punto da cui partire
  }

  fillCredentials(credentias: any = this.credentias) {
    element(by.id('user')).sendKeys(credentias.username); //user e pass riferimento all'html di login component
    element(by.id('pass')).sendKeys(credentias.password);

    element(by.id('buttonlogin')).click();  //id del button sempre riferito all'html di login component
  }

  getPageTitleText() {
    return element(by.css('h3')).getText();  
  }

  getErrorMessage(){
    return element(by.css('.alert-danger')).getText();  
  }
}