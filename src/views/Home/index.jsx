import Header from "../../components/Header";
import Card from '../../components/Cards'
import Navegation from "../../components/Nav";

import './home.css'

const Home = () => {

    return(
        <>
            <Header/>
            <main className='main'>
                <div className='task'>
                    <h3>Minhas Tarefas</h3>
                    <div className='cardsContainer'>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
            <Navegation />
            </main>
        </>
    )
}

export default Home