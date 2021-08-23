import React, { useState, useRef, useEffect } from 'react';
import { MdAdd } from 'react-icons/md'
import { VscEdit } from "react-icons/vsc";
import { FcCheckmark } from "react-icons/fc";
import './list.css'

import data from '../../service/data'

import Column from '../Column'

import { DragDropContext } from 'react-beautiful-dnd'

const List = () => {

    const [cardData, setCardData] = useState(data)
    const [edit, setEdit] = useState(false)

    const editar = useRef(null)
    useEffect(() => {
        //console.log(editar.current)

        

    }, [])

    const handleOnDragEnd = (result) => {
       
        // destination para onde ele vai
        // source onde ele estava
        // draggableId o meu id
        const { destination, source, draggableId } = result

        // console.log(draggableId) tem que ser o mesmo do objeto ou card

        if (!destination) return;
        
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        
        const start = cardData.columns[source.droppableId]
        const finish = cardData.columns[destination.droppableId]

        if(start === finish) {

            const items = Array.from(start.card);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            
            const newColumn = {
                ...start,
                card: items
            }

            const newState = {
                ...cardData,
                columns: {
                  ...cardData.columns,
                  [newColumn.id]: newColumn
                }
            }
            
            setCardData(newState)

            return  
        }
        
        //! mudando de list
        
        const startMovi = Array.from(start.card)

        startMovi.splice(result.source.index, 1)

        const moviStart = {
            ...start,
            card: startMovi
        }

        const moviFinish = Array.from(finish.card)
        
        moviFinish.splice(destination.index, 0, draggableId)
        // console.log(moviFinish)
        
        const newFinish = {
            ...finish,
            card: moviFinish
        }

        const newStateCollun = {
            ...cardData,
            columns: {
              ...cardData.columns,
              [moviStart.id]: moviStart,
              [newFinish.id]: newFinish
            }
        }

        setCardData(newStateCollun)

        return
    }   

    const handleEdit = () => {
        
        let dados = data.columns
        // console.log(Object.keys(dados).length)
         
    }

    return (
          <DragDropContext onDragEnd={handleOnDragEnd}>
                {cardData.columnOrder.map((id) => {
                    const colunas = cardData.columns[id]
                    const cards = colunas.card.map(item => cardData.tasks[item] )
            
                    return (
                            
                            <div key={colunas.id} className='containerList'>
                            <header>
                                {edit ? <input type="text" id={colunas.id} ref={editar} placeholder='Digite o seu tema' className='edit'/> : <h2>{colunas.title}</h2>}
        
                                <button id={colunas.id} onClick={handleEdit} > <VscEdit size={24} color='#ffff'  /></button>
                                {/* <button> <FcCheckmark size={24} color='#ffff' /></button> */}
                                <button> <MdAdd size={24} color='#ffff' /></button>
                            </header>
                                <Column key={colunas.id} colunas={colunas} cards={cards} />
                            </div>  
                    )
                })}
          </DragDropContext>
    )
}

export default List
