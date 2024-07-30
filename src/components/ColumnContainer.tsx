import { useSortable } from '@dnd-kit/sortable'
import TrashIcon from '../icons/TrashIcon'
import { Column, Id } from '../types'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import PlusIcon from '../icons/PlusIcon'

interface Props {
    column: Column
    deleteColumn: (id: Id) => void
    updateColumn: (id: Id, title: string) => void
    createTask: (columnId: Id) => void
}
function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn, createTask } = props

    const [editMode, setEditMode] = useState(false)

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: 'Columns',
            column,
        },
        disabled: editMode,
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className=" opacity-40 border-2 border-blue-500 bg-columnBackgroundColor w-[350px] h-[500px] mx-h-[500px] rounded-md flex flex-col"
            ></div>
        )
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-columnBackgroundColor w-[350px] h-[500px] mx-h-[500px] rounded-md flex flex-col"
        >
            <div
                {...attributes}
                {...listeners}
                onClick={() => setEditMode(true)}
                className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between"
            >
                <div className="flex gap-2">
                    <div className="flex justify-center items center bg-columnBackgroundColor  px-2 py-1 text-sm">
                        0
                    </div>
                    {!editMode && column.title}
                    {editMode && (
                        <input
                            className="bg-black focus:border-blue-500 border rounded outline-none px-2"
                            value={column.title}
                            onChange={(e) =>
                                updateColumn(column.id, e.target.value)
                            }
                            autoFocus
                            onBlur={() => {
                                setEditMode(false)
                            }}
                            onKeyDown={(e) => {
                                if (e.key !== 'Enter') return
                                setEditMode(false)
                            }}
                        />
                    )}
                </div>
                <button
                    onClick={() => deleteColumn(column.id)}
                    className="stroke-gray-500 hover:stroke-white  rounded px-1 py-2 "
                >
                    <TrashIcon />
                </button>
            </div>

            <div className="flex flex-grow">Content</div>
            <button
                onClick={() => {
                    createTask(column.id)
                }}
                className="flex gap-2 items-center border-columnBackgroundColor border-2 px-2 py-1 border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-blue-500 active:bg-black"
            >
                <PlusIcon />
                Add task
            </button>
        </div>
    )
}

export default ColumnContainer
