import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './App.css'

function App() {

    const inputRef = useRef<HTMLInputElement>(null)

    const firstRender = useRef(true);

    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState<string[]>([])

    const [editTask, setEditTask] = useState({
        enable: false,
        task: ''
    })

    useEffect(() => {
        const tarefasSalvas = localStorage.getItem('@curso-react')

        if(tarefasSalvas){
            setTasks(JSON.parse(tarefasSalvas));
        }
        
    }, [])

    useEffect(() => {
        if(firstRender.current){
            firstRender.current = false
            return;
        }

        localStorage.setItem('@curso-react', JSON.stringify(tasks))
    }, [tasks])

    const handleRegister = useCallback(() => {

        if(!input){
            alert('OPS... Digite alguma tarefa!')
            return;
        }

        if(editTask.enable){
            handleSaveEdit()
            return;
        }
        setTasks(tarefas => [...tarefas, input])
        setInput('')

    }, [tasks, input])

    function handleSaveEdit(){
        const findIndexTask = tasks.findIndex(task => task === editTask.task)
        const allTasks = [...tasks];

        allTasks[findIndexTask] = input;

        setTasks(allTasks);

        setEditTask({
            enable: false,
            task: ''
        })
        setInput('')
    }

    function handleDelete(item: string){
        const removeTask = tasks.filter(task => task !== item);
        setTasks(removeTask)
    }

    function handleEdit(item: string){
   
        inputRef.current?.focus();

        setInput(item)
        setEditTask({
            enable: true,
            task: item
        })
    }

    const totalTarefas = useMemo(() => {
        return tasks.length
    }, [tasks])

    return (
        <div>
            <h1> Lista de Tarefas </h1>

            <input 
                placeholder='Digite uma tarefa...'
                value = {input}
                onChange = {(e) => setInput(e.target.value)}
                ref = {inputRef}
            />

            <button onClick = {handleRegister}> 
                {editTask.enable ? 'Atualizar Tarefa' : 'Adicionar Tarefa'} 
            </button> <hr/>

            <strong> Você tem {totalTarefas} tarefas! </strong> <br/> <br/> <br/>
            
            {tasks.map((item, index) => (
                <div  key = {index}>
                <section>

                    <span> {item} </span>
                    <button onClick = {() => handleEdit(item)}> Editar </button>
                    <button onClick = {() => handleDelete(item)}> Excluir </button>

                </section> <br/>
                </div> 
            ))}
            
        </div>
    )
}

export default App
