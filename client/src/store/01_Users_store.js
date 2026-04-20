import { makeAutoObservable, toJS } from 'mobx';

class Users_store {
    data = [
        {
            id:1,
            first_name:'Иван',
            last_name:'Сидоров',
            personal_number:123,
            job_title:'Резчик х/м',
            status_siz: 0
        },
        {
            id:2,
            first_name:'Сергей',
            last_name:'Петров',
            personal_number:323,
            job_title:'Вальцовщик',
            status_siz: 10
        },
        {
            id:3,
            first_name:'Вася',
            last_name:'Пупкин',
            personal_number:423,
            job_title:'Резчик х/м',
            status_siz: 140
        },
        
    ];
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
