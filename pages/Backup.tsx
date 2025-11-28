import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Square, CheckSquare } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const Backup: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('sendai_backup_todos');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: '備案：如果藏王纜車停駛，改去山形市區', completed: false },
      { id: '2', text: '購買 JR Pass (如果需要)', completed: true },
    ];
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('sendai_backup_todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">備選行程 & 待辦</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="新增事項..."
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo} className="bg-gray-900 text-white p-2 rounded-lg ml-2 hover:bg-gray-800">
            <Plus size={18} />
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {todos.length === 0 ? (
             <div className="p-8 text-center text-gray-400 text-sm">目前沒有待辦事項</div>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className="p-4 flex items-center justify-between group">
                <div className="flex items-center flex-1 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                  {todo.completed ? (
                    <CheckSquare className="text-blue-500 w-5 h-5 mr-3" />
                  ) : (
                    <Square className="text-gray-300 w-5 h-5 mr-3" />
                  )}
                  <span className={`text-sm ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-xs text-gray-400 text-center">
        資料儲存於本機裝置
      </div>
    </div>
  );
};

export default Backup;
