import { makeAutoObservable, toJS } from 'mobx';

class Current_siz_store {
    data = null;
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    //Получить все сизы
    get_data() {
        return this.data;
    }
    //Добавить выбраный сиз
    add(item) {
        this.data = item;
    }
    log() {
        console.log(toJS(this.data));
    }
}

export default new Current_siz_store();
