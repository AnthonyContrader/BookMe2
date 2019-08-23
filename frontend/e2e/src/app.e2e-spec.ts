import { AppPage } from './app.po';

import {browser,by,element,logging} from 'protractor';

describe('protractor-tutorial - Login page', () => {
  let page: AppPage;

  const wrongCredentias = {
    username: 'test',          //test con credenziali errate, in questo caso non viene eseguito
    password: 'test'
  };

  beforeEach(() => {
    page = new AppPage();


  });

  function delay(ms: number) {    //temporizzatore 
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  it('when login is successful — he should redirect to default “public” page', async () => {
    page.navigateTo();
    page.fillCredentials();
    await delay(8000); //TEMPORIZZATORE DA INSERIRE PRIMA DEL CONTROLLO (PRENDERE TEMPO)
    expect(page.getPageTitleText()).toEqual('Ma Funziona!');
    expect(true).toBe(element(by.css('app-admin-dashboard')).isDisplayed());
  })
});
