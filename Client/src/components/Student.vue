<template>
  <div class="card container-sm m-1 mx-auto">
    <div v-if="isAuthenticated" class="card-body">
      <h5 class="card-title">Nume student: {{ student.name }}</h5>
      <h5 class="card-title">Status student: {{ student.status }}</h5>
      <h5 class="card-title">ID student: {{ student.id }}</h5>
      <div class="container px-4">
        <div class="row justify-content-evenly text-nowrap m-3">
          <button
            v-if="isAuthenticated"
            @click="
              () => {
                handleSportShow = !handleSportShow;
                getSports();
              }
            "
            class="btn btn-primary col-2"
          >
            View sports
          </button>
          <button
            v-if="isAuthenticated"
            @click="() => (handleSportSearch = !handleSportSearch)"
            class="btn btn-primary col-2"
          >
            Add sport
          </button>
          <button
            v-if="isAuthenticated"
            @click="edit"
            class="btn btn-primary col-2"
          >
            Edit
          </button>
          <button
            v-if="isAuthenticated"
            @click="remove"
            class="btn btn-danger col-2"
          >
            Delete
          </button>
        </div>
        <div
          v-if="handleSportSearch"
          class="row text-nowrap justify-content-evenly"
        >
          <input v-model="sportName" type="text" class="col-sm-8" required />
          <button
            v-if="isAuthenticated"
            @click="addSport"
            class="btn btn-primary col-2"
          >
            Add
          </button>
        </div>
        <div>
          <!-- && student.sport.length > 0 -->
          <div v-if="handleSportShow && this.sports.length > 0" class="row">
            <!--!!!!!!!!!!! -->
            <div class="row" v-for="sport in this.sports" :key="sport.id">
              <div class="col-4">Sport: {{ sport.name }}</div>
              <button
                v-if="isAuthenticated"
                @click="editSport(sport)"
                class="btn btn-primary col-2"
              >
                Edit
              </button>

              <button
                v-if="isAuthenticated"
                @click="deleteSport(sport)"
                class="btn btn-danger col-2"
              >
                Remove
              </button>
            </div>
          </div>
          <div v-else-if="handleSportShow">No sports</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils, { globalRequestParameters } from "../utils.js";

export default {
  name: "Student",
  props: {
    student: Object,
  },
  data() {
    return {
      handleSportSearch: false,
      handleSportShow: false,
      sportName: "",
      sports: [],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    edit() {
      this.$emit("edit", this.student);
      this.$router.push("/edit/" + this.student.id);
    },
    remove() {
      this.$emit("remove", this.student);
    },
    addSport() {
      let requestParameters = { ...utils.globalRequestParameters };
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = "Bearer " + token;
      requestParameters.method = "POST";

      let data = {};
      data.name = this.sportName;
      requestParameters.body = JSON.stringify(data);

      fetch(utils.url + "students/sport/" + this.student.id, requestParameters);
      this.handleSportSearch = !this.handleSportSearch;
      this.sportName = "";
    },
    deleteSport(sport) {
      let requestParameters = { ...utils.globalRequestParameters };
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = "Bearer " + token;
      requestParameters.method = "DELETE";

      console.log("try to remove");
      fetch(
        utils.url + "students/sport/" + this.student.id + "/" + sport.id,
        requestParameters
      );
    },
    editSport(sport) {
      this.$router.push("/editsport/" + this.student.id + "/" + sport.id);
    },
    async getSports() {
      var data = [];
      await fetch(
        utils.url + "students/sport/" + this.student.id,
        globalRequestParameters
      )
        .then((res) => res.json())
        .then((content) => data.push(content));

      data = data[0];

      if (this.sports.length == 0) {
        for (const obj of data) {
          this.sports.push(obj);
        }
      }
    },
  },
};
</script>

<style></style>
