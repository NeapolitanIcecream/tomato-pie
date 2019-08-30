/**
 * store data structure
 *
 * currentStartAt: 132413241234,
 *
 * isDefaultNewTab: boolean,
 *
 * isFocusingMode: boolean,
 *
 * isShowStatics: boolean,
 *
 * isShowTextarea: boolean,
 *
 * isShowSidebar: boolean,
 *
 * textareData: string,
 *
 * tomatoList: [{
 *   startAt: 1533653542468, // also used as id
 *   todoId: 1533653542468,
 * }],
 *
 * todoList: [{
 *   createdAt: 1533653542468, // also used as id
 *   content: "master css position",
 *   tag: "Tomato Pie"
 * }]
 *
 * doneList: [{
 *   createdAt: 1533653542468, // also used as id
 *   content: "master css position",
 *   tag: "",
 * }]
 *
 * tagList: [
 *  "Todo List",
 *  "Tomato Pie"
 * ]
 *
 * tagColorList: [
 * ]
 *
 * selectedTag: "Todo List"
 */

// null; true; false;
const DefaultNewTab = {
  // TODO: write function to remove code duplication
  get: () => {
    const item = localStorage.getItem('isDefaultNewTab');
    if (item === 'true') return true;
    if (item === 'false') return false;
    if (item === null) return true; // default true
    throw new Error('error getting boolean');
  },
  set: (boolean) => {
    if (boolean === true) {
      localStorage.setItem('isDefaultNewTab', 'true');
    } else if (boolean === false) {
      localStorage.setItem('isDefaultNewTab', 'false');
    } else {
      throw new Error('error setting boolean, only allow true or false');
    }
  },
};

// null; true; false;
const FocusingMode = {
  get: () => {
    const item = localStorage.getItem('isFocusingMode');
    if (item === 'true') return true;
    if (item === 'false') return false;
    if (item === null) return true; // default true
    throw new Error('error getting boolean');
  },
  set: (boolean) => {
    if (boolean === true) {
      localStorage.setItem('isFocusingMode', 'true');
    } else if (boolean === false) {
      localStorage.setItem('isFocusingMode', 'false');
    } else {
      throw new Error('error setting boolean, only allow true or false');
    }
  },
};

const ShowSidebar = {
  get: () => {
    const item = localStorage.getItem('isShowSidebar');
    if (item === 'true') return true;
    if (item === 'false') return false;
    if (item === null) return null;
    throw new Error('error getting boolean');
  },
  set: (boolean) => {
    if (boolean === true) {
      localStorage.setItem('isShowSidebar', 'true');
    } else if (boolean === false) {
      localStorage.setItem('isShowSidebar', 'false');
    } else {
      throw new Error('error setting boolean, only allow true or false');
    }
  },
};

const ShowStatics = {
  get: () => {
    const item = localStorage.getItem('isShowStatics');
    if (item === 'true') return true;
    if (item === 'false') return false;
    if (item === null) return null;
    throw new Error('error getting boolean');
  },
  set: (boolean) => {
    if (boolean === true) {
      localStorage.setItem('isShowStatics', 'true');
    } else if (boolean === false) {
      localStorage.setItem('isShowStatics', 'false');
    } else {
      throw new Error('error setting boolean, only allow true or false');
    }
  },
};

const ShowTextarea = {
  get: () => {
    const item = localStorage.getItem('isShowTextarea');
    if (item === 'true') return true;
    if (item === 'false') return false;
    if (item === null) return null;
    throw new Error('error getting boolean');
  },
  set: (boolean) => {
    if (boolean === true) {
      localStorage.setItem('isShowTextarea', 'true');
    } else if (boolean === false) {
      localStorage.setItem('isShowTextarea', 'false');
    } else {
      throw new Error('error setting boolean, only allow true or false');
    }
  },
};

const Textarea = {
  get: () => localStorage.getItem('textareaData'),
  set: content => localStorage.setItem('textareaData', content),
};

const CurrentStartAt = {
  get: () => Number(localStorage.getItem('currentStartAt')),
  put: currentStartAt => localStorage.setItem('currentStartAt', currentStartAt),
  remove: () => localStorage.removeItem('currentStartAt'),
};

const Tomato = {
  getAll: () => {
    const all = JSON.parse(localStorage.getItem('tomatoList'));
    if (!all) return [];
    return all;
  },
  // get tomatoes of last 12 hours
  get12h: () => {
    const all = JSON.parse(localStorage.getItem('tomatoList'));
    if (!all) return [];
    return all.filter(tomato => tomato.startAt > new Date().getTime() - 1000 * 60 * 60 * 12);
  },
  push: (tomato) => {
    const cur = JSON.parse(localStorage.getItem('tomatoList'));
    let next;
    if (!cur) {
      next = [tomato];
    } else {
      next = cur.concat(tomato);
    }
    localStorage.setItem('tomatoList', JSON.stringify(next));
    return next;
  },
  pop: () => {
    const cur = JSON.parse(localStorage.getItem('tomatoList'));
    const next = cur.slice(0, -1);
    localStorage.setItem('tomatoList', JSON.stringify(next));
    return next;
  },
  remove: (startAt) => {
    const cur = JSON.parse(localStorage.getItem('tomatoList'));
    const next = cur.filter(tomato => tomato.startAt !== startAt);
    localStorage.setItem('tomatoList', JSON.stringify(next));
    return next;
  },
};

const Todo = {
  get: (id) => {
    const all = JSON.parse(localStorage.getItem('todoList'));
    if (!all) return null;
    const theOne = all.filter(todo => Number(todo.createdAt) === Number(id))[0];
    if (!theOne) return null;
    return theOne;
  },
  getAll: () => {
    const all = JSON.parse(localStorage.getItem('todoList'));
    if (!all) return [];
    return all;
  },
  setAll: (todos) => {
    localStorage.setItem('todoList', JSON.stringify(todos));
    return todos;
  },
  remove: (createdAt) => {
    const cur = JSON.parse(localStorage.getItem('todoList'));
    const next = cur.filter(todo => todo.createdAt !== createdAt);
    localStorage.setItem('todoList', JSON.stringify(next));
    return next;
  },
  push: (todo) => {
    const cur = JSON.parse(localStorage.getItem('todoList'));
    let next;
    if (!cur) {
      next = [todo];
    } else {
      next = cur.concat(todo);
    }
    localStorage.setItem('todoList', JSON.stringify(next));
    return next;
  },
  update: (createdAt, content) => {
    const cur = JSON.parse(localStorage.getItem('todoList'));
    const next = cur.map((todo) => {
      const newTodo = todo;
      if (newTodo.createdAt === createdAt) newTodo.content = content;
      return newTodo;
    });
    localStorage.setItem('todoList', JSON.stringify(next));
    return next;
  },
  move: (oldIndex, newIndex) => {
    const cur = JSON.parse(localStorage.getItem('todoList'));
    const [oldTodo] = cur.splice(oldIndex, 1);
    cur.splice(newIndex, 0, oldTodo);
    const next = cur;
    localStorage.setItem('todoList', JSON.stringify(next));
    return next;
  },
};

const Done = {
  get: (id) => {
    const all = JSON.parse(localStorage.getItem('doneList'));
    if (!all) return null;
    const theOne = all.filter(todo => Number(todo.createdAt) === Number(id))[0];
    if (!theOne) return null;
    return theOne;
  },
  getAll: () => JSON.parse(localStorage.getItem('doneList')),
  remove: (createdAt) => {
    const cur = JSON.parse(localStorage.getItem('doneList'));
    const next = cur.filter(todo => todo.createdAt !== createdAt);
    localStorage.setItem('doneList', JSON.stringify(next));
    return next;
  },
  push: (todo) => {
    const cur = JSON.parse(localStorage.getItem('doneList'));
    let next;
    if (!cur) {
      next = [todo];
    } else {
      next = cur.concat(todo);
    }
    localStorage.setItem('doneList', JSON.stringify(next));
    return next;
  },
};

const Tag = {
  getAll: () => {
    const all = JSON.parse(localStorage.getItem('tagList'));
    if (!all) return [];
    return all;
  },
  remove: (i) => {
    const cur = JSON.parse(localStorage.getItem('tagList'));
    cur.splice(i, 1);
    localStorage.setItem('tagList', JSON.stringify(cur));
    return cur;
  },
  push: (name) => {
    const cur = JSON.parse(localStorage.getItem('tagList'));
    let next;
    if (!cur) {
      next = [name];
    } else {
      // check duplication
      if (cur.includes(name)) {
        throw new Error('same tag name not allowed');
      }
      next = cur.concat(name);
    }
    localStorage.setItem('tagList', JSON.stringify(next));
    return next;
  },
  update: (i, newName) => {
    const cur = JSON.parse(localStorage.getItem('tagList'));
    cur[i] = newName;
    localStorage.setItem('tagList', JSON.stringify(cur));
    return cur;
  },
  move: (oldIndex, newIndex) => {
    const cur = JSON.parse(localStorage.getItem('tagList'));
    const [oldTodo] = cur.splice(oldIndex, 1);
    cur.splice(newIndex, 0, oldTodo);
    const next = cur;
    localStorage.setItem('tagList', JSON.stringify(next));
    return next;
  },
};

const SelectedTag = {
  get: () => {
    const cur = localStorage.getItem('selectedTag');
    return cur;
  },
  set: (tag) => {
    localStorage.setItem('selectedTag', tag);
    return tag;
  },
};

const TagColor = {
  getAll: () => {
    const all = JSON.parse(localStorage.getItem('tagColorList'));
    if (!all) return [];
    return all;
  },
  update: (i, newName) => {
    let cur = JSON.parse(localStorage.getItem('tagColorList'));
    if (!cur) cur = [];
    cur[i] = newName;
    localStorage.setItem('tagColorList', JSON.stringify(cur));
    return cur;
  },
};

// TODO: todo tags??
export default {
  DefaultNewTab,
  FocusingMode,
  ShowSidebar,
  ShowStatics,
  ShowTextarea,
  Textarea,
  CurrentStartAt,
  Tomato,
  Todo,
  Done,
  Tag,
  SelectedTag,
  TagColor,
};
