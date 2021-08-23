const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      tema: "Lista 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi",
      img: null,
    },
    "task-2": {
      id: "task-2",
      tema: "Lista 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi",
      img: null,
    },
    "task-3": {
      id: "task-3",
      tema: "Lista 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi",
      img: null,
    },
    "task-4": {
      id: "task-4",
      tema: "Lista 4",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi",
      img: null,
    },
    "task-5": {
      id: "task-5",
      tema: "Lista 5",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi",
      img: null,
    },
    "task-6": {
      id: "task-6",
      tema: "Lista 6",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi",
      img: null,
    },
    "task-7": {
      id: "task-7",
      tema: "Lista 7",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias soluta facilis excepturi",
      img: null,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      card: ["task-1", "task-2", "task-3", "task-4", "task-5"],
    },
    "column-2": {
      id: "column-2",
      title: "Em progress",
      card: ["task-6"],
    },
    "column-3": {
      id: "column-3",
      title: "Finishi",
      card: ["task-7"],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
