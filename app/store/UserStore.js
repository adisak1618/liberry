import { observable } from 'mobx';

class UserStore {
  @observable firstname = null;

  @observable lastname = null;

  @observable email = null;

  @observable id = null;

  @observable type = null;

  @observable tell = null;


  setUSer({
    firstname, lastname, email, id, type, tel,
  }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.id = id;
    this.type = type;
    this.tel = tel;
  }
}

export default new UserStore();
