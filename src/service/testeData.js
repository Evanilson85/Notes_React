export const todosCard = [
    {
        '1': {   
            id: '1',
            tema: 'Lista 1',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
            img: null
        },
        '2': {   
            id: '2',
            tema: 'Lista 2',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
            img: null
        },
        '3':  {   
            id: '3',
            tema: 'Lista 3',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
            img: null
        },
        '4': {   
            id: '4',
            tema: 'Lista 4',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
            img: null
        },
        '5':  {   
            id: '5',
            tema: 'Lista 5',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
            img: null
        },
        '6': {   
            id: '6',
            tema: 'Lista 6',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
            img: null
        },
        '7':  {   
            id: '7',
            tema: 'Lista 7',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
            img: null
        },
        '8':{   
            id: '8',
            tema: 'Lista 8',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
            img: null
        },
        'teste': {   
            id: 'teste',
            tema: 'Lista 9',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
            img: null
        }
    }
]
const cards = todosCard[0]
const teste = [
    {
        id: 1,
        title: 'Tarefas 1',
        card: [cards['1'].id, cards['2'].id, cards['3'].id, cards['4'].id]
        // card: []
    },
    {
        id: 2,
        title: 'Tarefas em Processo',
        card: [cards['5'].id, cards['6'].id]
        // card: []
    },
    {
        id: 3,
        title: 'Tarefas Concluidos',
        // card:  [cards[7].id, cards['teste'].id]
        card: []
    },
]




export default teste