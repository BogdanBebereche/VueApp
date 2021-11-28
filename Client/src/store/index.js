import { createStore } from "vuex";

export default createStore({
  state: {
    students: [],
    isAuthenticated: localStorage.getItem("token") ? true : false,
  },
  getters: {
    students: (state) => {
      return state.students;
    },
  },
  mutations: {
    SET_STUDENTS: (state, students) => {
      state.students = students;
    },
    SET_AUTH: (state, status) => {
      state.isAuthenticated = status;
    },
    ADD_STUDENT: (state, student) => {
      state.students.push(student);
    },
    DELETE_STUDENT: (state, student) => {
      let index = state.students.indexOf(student);
      state.students.splice(index, 1);
    },
  },
  actions: {
    fetchStudents: ({ commit }, payload) => {
      commit("SET_STUDENTS", payload);
    },
    login: ({ commit }, payload) => {
      commit("SET_AUTH", payload);
    },
    addStudent: ({ commit }, payload) => {
      commit("ADD_STUDENT", payload);
    },
    deleteStudent: ({ commit }, payload) => {
      commit("DELETE_STUDENT", payload);
    },
  },
  modules: {},
});
