import { makeAutoObservable, toJS } from 'mobx';

class Inventory {
    data = [];
    siz = {};

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    //Получить все сизы
    set_data(item) {
        this.data.push(item);
    }
    get_all_data() {
        return this.data;
    }
    set_selected_siz(item) {
        this.siz = item;
    }
    set_siz(item) {
        this.siz = item;
    }
    get_selected_siz() {
        return this.siz;
    }
    log() {
        console.log(toJS(this.data));
    }
    log_siz() {
        console.log(toJS(this.siz));
    }

}

export default new Inventory();
