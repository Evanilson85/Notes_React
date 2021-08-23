import { Droppable } from 'react-beautiful-dnd'

import Card from '../Cards'

const Column = ({ colunas, cards }) => {
    return(
        <Droppable droppableId={colunas.id}>
                {(provided) => (
                    <ul className={colunas.id} ref={provided.innerRef} {...provided.droppableProps}>
                        {cards.map((item, index) => (<Card key={item.id} item={item} index={index} /> ))} 
                        {provided.placeholder}
                    </ul>
                )}
        </Droppable>
          
    )
}

export default Column