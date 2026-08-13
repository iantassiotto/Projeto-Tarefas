import { useState, useEffect } from "react"

const Tarefas = () => {

    const [tarefas, setTarefas] = useState(() => {
        const salvarDados = localStorage.getItem("itens-tarefas"); // Chave padronizada
        return salvarDados ? JSON.parse(salvarDados) : [];
    });

    const [campo, setCampo] = useState('');

    useEffect(() => {
        localStorage.setItem("itens-tarefas", JSON.stringify(tarefas));
    }, [tarefas]); // Array de dependências adicionado corretamente

    const AdicionarTarefa = (e) => {
        e.preventDefault();
        if (!campo.trim()) return;

        const novaTarefa = {
            id: Date.now(),
            text: campo,
        };

        setTarefas([...tarefas, novaTarefa]);
        setCampo(''); // Limpa com string vazia
    };

    const RemoverTarefa = (id) => {
        const alterarTarefa = tarefas.filter((tarefa) => {return tarefa.id !== id}); // Removidas as chaves para retornar corretamente
        setTarefas(alterarTarefa);
    }

    return (
        <>
            <div className="todo-container">
                <h1>Minha Lista de Tarefas</h1>
                <form onSubmit={AdicionarTarefa} className="todo-form">
                    <input
                        type="text"
                        value={campo}
                        placeholder="Digite uma nova Tarefa..."
                        className="todo-input"
                        onChange={(e) => setCampo(e.target.value)} />

                    <button type="submit" className="btn-add">Adicionar</button>
                </form>
                <ul className="todo-list">
                    {tarefas.map((item) => (
                        <li key={item.id} className="todo-item">
                            <span>{item.text}</span>
                            <button onClick={() => RemoverTarefa(item.id)} className="btn-delete">
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
                {tarefas.length === 0 && <p className="todo-vazio">Nenhuma Tarefa</p>}
            </div>
        </>
    )
}

export default Tarefas