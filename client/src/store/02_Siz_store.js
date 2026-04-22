import { makeAutoObservable, toJS } from 'mobx';
import perchi from '../assets/перчи.png';
import kostym from '../assets/костюм.png';
class Siz_store {
    data = [
        {
            id: 1,
            img: perchi,
            title: 'Ботинки рабочие',
            description: 'Защитный подносок, антипрокольная стелька, МБС подошва.',
            attributes: [
                {
                    label: 'Размер',
                    value: '44,47,45',
                },
                {
                    label: 'Рост',
                    value: '174-189,190-210,45',
                },
                {
                    label: 'Размах рук',
                    value: '25',
                },
            ],
            replacement: false,
            status: '',
            start_date: '12.12.26',
            end_date: '12.12.27',
        },
        {
            id: 2,
            img: kostym,
            title: 'Костюм каспер',
            description:
                'Защитный комбинезон "Каспер" является надежным средством для защиты одежды от попадания грязи и производственной пыли, а также обеспечивает защиту продуктов питания и др. товаров от нежелательного контакта с открытыми участками верхней одежды сотрудников.',
            attributes: [
                {
                    label: 'Размер',
                    value: '88-92,96-100,104-108, 112-116,120-124',
                },
                {
                    label: 'Рост',
                    value: '158-164,170-176, 182-188,182-188 ,182-188,182-188 ,182-188',
                },
            ],
            replacement: false,
            status: '',
            start_date: '12.12.26',
            end_date: '12.12.27',
        },
    ];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
    //Получить все сизы
    get_all_data() {
        return this.data;
    }
    //Добавить сиз
    add(new_siz) {
        this.data.push(new_siz);
    }
    //Выбрать сиз
    get_pick_item(id) {
        return this.data.find((item) => item.id === id);
    }
    //Добавить выбраный сиз
    get_current(id) {
        return this.data.find((item) => item.id === id) || null;
    }
    //Удалить сиз
    remove_item(id) {
        this.data = this.data.filter((item) => item.id !== id);
    }
    log() {
        console.log(toJS(this.data));
    }
}

export default new Siz_store();
