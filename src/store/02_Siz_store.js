import { makeAutoObservable, toJS } from 'mobx';

class Siz_store {
    data = [];
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    get_all_data() {
        return this.data;
    }
    add(new_siz) {
        this.data.push(new_siz);
    }
    log() {
        console.log(toJS(this.data));
    }
}

export default new Siz_store();
