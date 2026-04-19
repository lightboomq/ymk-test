import { makeAutoObservable } from 'mobx';

class Error_message {
    message = '';
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    get_message() {
        return this.message;
    }
    set_message(err) {
        this.message = err;
    }
}

export default new Error_message();
