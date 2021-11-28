<template>
  <div class="card card-body mt-4 container col-8">
    <br />
    <div v-if="isAuthenticated">
      <div>Numele studentilor:</div>

      <div v-if="isAuthenticated" class="buttons">
        <button
          class="btn btn-light"
          @click.prevent="
            () => {
              students.sort(compare);
            }
          "
        >
          ASC
        </button>
        <button
          class="btn btn-light"
          @click.prevent="
            () => {
              students.sort(compare).reverse();
            }
          "
        >
          DESC
        </button>
      </div>
      <Student
        @remove="deleteStudent"
        :student="elem"
        v-for="elem in students"
        :key="elem.id"
      />
    </div>
    <div v-else>Please Log in in order to see the students</div>
  </div>
</template>

<script>
import Student from "../components/Student.vue";
import utils, { globalRequestParameters } from "../utils.js";

export default {
  name: "StudentList",
  components: {
    Student,
  },
  data() {
    return {};
  },
  created() {
    let url = utils.url;
    if (!this.students.length) {
      fetch(url + "students", globalRequestParameters).then((res) =>
        res.json().then((res) => {
          this.$store.dispatch("fetchStudents", res);
        })
      );
    }
  },
  computed: {
    students() {
      return this.$store.state.students;
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    deleteStudent(student) {
      console.log("Try to delete ", student);
      this.$store.dispatch("deleteStudent", student);
      let requestParameters = { ...utils.globalRequestParameters };
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = "Bearer " + token;
      requestParameters.method = "DELETE";

      fetch(utils.url + "students/" + student.id, requestParameters);
    },

    compare(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    },
  },
};
</script>

<style></style>
