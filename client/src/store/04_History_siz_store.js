import { makeAutoObservable, toJS } from 'mobx';

class History_siz_store {
    data = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    get_all_data() {
        return this.data;
    }
    add(new_item) {
        this.data.push(new_item);
    }
    log() {
        console.log(toJS(this.data));
    }
}

export default new History_siz_store();
