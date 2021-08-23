import Header from "../../components/Header";
import Card from '../../components/Cards'
import Navegation from "../../components/Nav";
import Load from '../../components/Load'
import Container from '../../components/Container'
import List from '../../components/List'

import './home.css'

const Home = () => {

    const teste = [
        {
            id: 1,
            title: 'Tarefas 1',
            card: [
                {   
                    id: '1',
                    tema: 'Lista 1',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
                {   
                    id: '2',
                    tema: 'Lista 2',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
                {   
                    id: '3',
                    tema: 'Lista 3',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
                {   
                    id: '4',
                    tema: 'Lista 4',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
            ]
        },
        {
            id: 2,
            title: 'Tarefas em Processo',
            card: [
                {   
                    id: '5',
                    tema: 'Lista 5',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
            ]
        },
        {
            id: 3,
            title: 'Tarefas Concluidos',
            card: [
                {   
                    id: '6',
                    tema: 'Lista 6',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
                {   
                    id: '7',
                    tema: 'Lista 7',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
                {   
                    id: '8',
                    tema: 'Lista 8',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                }
            ]
        },
    ]


    return(
        <>
            <Header/>
            <main className='main'>
                    <Navegation />
                <div className='task'>
                    <h3>Minhas Tarefas</h3>
                    <div className='cardsContainer'>
                        <Container>
                            <List/>
                        </Container> 
                    </div>
                    {/* <Load/> */}
                </div>
            </main>
        </>
    )
}

export default Home