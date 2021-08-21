import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md'
import Card from '../Cards'
import './list.css'
import imagen from '../../assets/images/avatar.png'


import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';
    
const List = ({card, colluns}) => {

    const [characters, setCharacters] = useState(card)
    const [collun, setCollun] = useState(colluns)
    const [idCollun, setIdCollun ] = useState(null)

    useEffect(()=>{

    }, [])

    const handleOnDragEnd = (result) => {
        const { destination, source, draggableId } = result
        // destination para onde ele vai
        // source onde ele estava
        // draggableId o meu id

        // console.log(source.droppableId)
        // console.log(source.droppableId, destination.droppableId)

        if (!destination) return;
        
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);

        setCharacters(items)

        // console.log(characters)
    }   

    return(
        <div className='containerList'>
          <header>
              <h2>Tarefas</h2>
                <button>
                    <MdAdd size={24} color='#ffff' />
                </button>
          </header>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            
            <Droppable droppableId="characters">
            
                {(provided) => ( 
                    <ul className='characters' ref={provided.innerRef} {...provided.droppableProps}>
                        
                    {characters.map(({id, tema, text, img}, index) => {
                        return (
                            <Draggable key={id} draggableId={id} index={index}>
                                {(providedCards) => (
                                    // <Card ref={providedCards.innerRef} {...providedCards.draggableProps} {...providedCards.dragHandleProps} key={id} tema={tema} text={text} img={img} />
                                    <li className='box' ref={providedCards.innerRef} {...providedCards.draggableProps} {...providedCards.dragHandleProps} key={id} >
                                        <header>
                                            {tema}
                                        </header>
                                        <div className='box'>
                                            <p> {text} </p>
                                            <img src={img === null ? imagen : img} alt="capa" />
                                        </div>
                                    </li>
                                 )}
                            </Draggable> 
                        )}
                    )}
                    {provided.placeholder}
                </ul>
                )}
            </Droppable>
          </DragDropContext>
        </div>
    )
}

export default List