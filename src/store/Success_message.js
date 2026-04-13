import { makeAutoObservable } from 'mobx';

class Succes_message {
    is_show = false;
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    get_is_show() {
        return this.is_show;
    }
    set_is_show(flag) {
        this.is_show = flag;
    }
}

export default new Succes_message();
