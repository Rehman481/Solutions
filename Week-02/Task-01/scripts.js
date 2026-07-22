(function() {
  // ----- STATE -----
  let tasks = [];
  let currentFilter = 'all';

  // ----- DOM refs -----
  const taskListEl = document.getElementById('taskList');
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const remainingCountEl = document.getElementById('remainingCount');
  const remainingCountFooterEl = document.getElementById('remainingCountFooter');

  // ----- helpers -----
  function getRemaining() {
    return tasks.filter(t => !t.completed).length;
  }

  function updateRemainingDisplay() {
    const rem = getRemaining();
    remainingCountEl.textContent = rem;
    remainingCountFooterEl.textContent = rem;
  }

  // ----- render (DOM creation) -----
  function render() {
    let filtered = tasks;
    if (currentFilter === 'active') {
      filtered = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
      filtered = tasks.filter(t => t.completed);
    }

    taskListEl.innerHTML = '';

    if (filtered.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-message';
      empty.textContent = currentFilter === 'all' ? 'No tasks yet. Add one above!' :
                         currentFilter === 'active' ? 'No active tasks ✨' : 'No completed tasks';
      taskListEl.appendChild(empty);
      updateRemainingDisplay();
      return;
    }

    for (const task of filtered) {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.completed ? ' completed' : '');
      li.dataset.id = task.id;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'toggle-check';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', function(e) {
        e.stopPropagation();
        toggleTaskComplete(task.id);
      });

      const textSpan = document.createElement('span');
      textSpan.className = 'task-text';
      textSpan.textContent = task.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '✕';
      deleteBtn.setAttribute('aria-label', 'Delete task');
      deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        deleteTask(task.id);
      });

      li.appendChild(checkbox);
      li.appendChild(textSpan);
      li.appendChild(deleteBtn);

      li.addEventListener('click', function(e) {
        if (e.target === li || e.target === textSpan) {
          toggleTaskComplete(task.id);
        }
      });

      taskListEl.appendChild(li);
    }

    updateRemainingDisplay();
  }

  // ----- CRUD operations -----
  function addTask(text) {
    const trimmed = text.trim();
    if (trimmed === '') return false;
    const newTask = {
      id: Date.now() + Math.random().toString(36).slice(2, 6),
      text: trimmed,
      completed: false,
    };
    tasks.push(newTask);
    render();
    taskInput.value = '';
    taskInput.focus();
    return true;
  }

  function toggleTaskComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      render();
    }
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
  }

  // ----- filter change -----
  function setFilter(filter) {
    currentFilter = filter;
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    render();
  }

  // ----- event listeners -----
  addBtn.addEventListener('click', function() {
    addTask(taskInput.value);
  });

  taskInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask(taskInput.value);
    }
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      setFilter(filter);
    });
  });

  // ----- initial seeding -----
  tasks = [
    { id: '1', text: 'Learn DOM manipulation', completed: false },
    { id: '2', text: 'Build a to-do list', completed: false },
    { id: '3', text: 'Write comparison', completed: true },
  ];
  render();
  taskInput.focus();
})();