/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { error } from 'console';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  // const [user, setUser] = useState<User>('');

  const handleSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };

  // const handleSelectedUser = (user: User) => {
  //   setUser(user);
  // };

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodos(todos);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Не вдалось завантажити данні', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList
                todos={todos}
                onSelectedTodo={handleSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
