import { MdAdd } from 'react-icons/md'
import Card from '../Cards'
import './list.css'

const List = ({card}) => {
    return(
        <div className='containerList'>
          <header>
              <h2>Tarefas</h2>
                <button>
                    <MdAdd size={24} color='#ffff' />
                </button>
          </header>
          <ul>
              {card.map(item => <Card key={item.tema} tema={item.tema} text={item.text} img={item.img} />)}
          </ul>
        </div>
    )
}

export default List