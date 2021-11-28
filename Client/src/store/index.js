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
    SET_AUTH: (state, status) => {
      state.isAuthenticated = status;
    },
    SET_STUDENTS: (state, students) => {
      state.students = students;
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
    login: ({ commit }, payload) => {
      commit("SET_AUTH", payload);
    },
    fetchStudents: ({ commit }, payload) => {
      commit("SET_STUDENTS", payload);
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
