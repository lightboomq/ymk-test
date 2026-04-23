import { makeAutoObservable, toJS } from 'mobx';
import perchi from '../assets/перчи.png';
import kostym from '../assets/костюм.png';

class Stock {
    items = [
        {
            id: 1,
            img: perchi,
            title: 'Ботинки рабочие',
            description: 'Защитный подносок, антипрокольная стелька, МБС подошва.',
            attributes: [
                { label: 'Размер', value: '44,47,45' },
                { label: 'Рост', value: '174-189,190-210,45' },
                { label: 'Размах рук', value: '25' },
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
            description: 'Защитный комбинезон "Каспер" является надежным средством для защиты одежды от попадания грязи...',
            attributes: [
                { label: 'Размер', value: '88-92,96-100,104-108, 112-116,120-124' },
                { label: 'Рост', value: '158-164,170-176, 182-188,182-188' },
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

    get all() {
        return this.items;
    }

    add(item) {
        this.items.push(item);
    }
    find(id) {
        return this.items.find((item) => item.id === id) || null;
    }
    remove(id) {
        this.items = this.items.filter((item) => item.id !== id);
    }
    print_debug() {
        console.log(toJS(this.items));
    }
}

export default new Stock();
