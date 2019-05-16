import { observable, action } from 'mobx';

class Store {
  @observable loginPopup = false;

  @observable signupPopup = false;

  @observable loginErrorBox = false;

  @observable signupErrorBox = false;

  @action
  toggleLogin(value) {
    this.loginPopup = value;
  }
}
export default new Store();
