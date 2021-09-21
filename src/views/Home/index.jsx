import Header from "../../components/Header";
import Navegation from "../../components/Nav";

import Container from '../../components/Container'
import Lista from '../../components/List'


import './home.css'

const Home = () => {

    return (
        <>
            <Header />
            <main className='main'>
                <Navegation />
                <div className='task'>
                    <h3>Minhas Tarefas</h3>

                    <div className='cardsContainer'>
                        <Container>
                            <Lista />
                        </Container>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home