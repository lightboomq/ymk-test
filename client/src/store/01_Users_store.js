import { makeAutoObservable, toJS } from 'mobx';

class Users_store {
    data = [];
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    get_all_data() {
        return this.data;
    }
    add(new_user) {
        this.data.push(new_user);
    }
    log() {
        console.log(toJS(this.data));
    }
}

export default new Users_store();
