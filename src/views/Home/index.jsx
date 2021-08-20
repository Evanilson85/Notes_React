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
                    tema: 'Tafera 1',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
                {
                    tema: 'Tafera 12',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
                {
                    tema: 'Tafera 13',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
                {
                    tema: 'Tafera 14',
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
                    tema: 'Tafera 1',
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
                    tema: 'Tafera 1',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
                {
                    tema: 'Tafera 12',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi',
                    img: null
                },
                {
                    tema: 'Tafera 13',
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
                            {teste.map(list => <List key={list.id} card={list.card} />)}

                            {/* <List />
                            <List />
                            <List /> */}
                        </Container> 
                    </div>
                    {/* <Load/> */}
                </div>
            </main>
        </>
    )
}

export default Home