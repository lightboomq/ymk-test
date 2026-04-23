import { makeAutoObservable, toJS } from 'mobx';

class Users {
    users = [
        {
            id: 1,
            first_name: 'Иван',
            last_name: 'Сидоров',
            personal_number: 123,
            job_title: 'Резчик х/м',
            status_siz: 0,
        },
        {
            id: 2,
            first_name: 'Сергей',
            last_name: 'Петров',
            personal_number: 323,
            job_title: 'Вальцовщик',
            status_siz: 10,
        },
        {
            id: 3,
            first_name: 'Вася',
            last_name: 'Пупкин',
            personal_number: 423,
            job_title: 'Резчик х/м',
            status_siz: 140,
        },
    ];


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    all() {
        return this.users;
    }
    add(new_user) {
        this.users.push(new_user);
    }
    print_debug() {
        console.log(toJS(this.users));
    }
}

export default new Users();
