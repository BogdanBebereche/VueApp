<template>
  <div class="card card-body mt-4 container">
    <form @submit.prevent="addStudent()">
      <br />
      <div class="row">
        <label class="col-sm-2"> Name </label>
        <input v-model="name" type="text" class="col-sm-8" required />
      </div>
      <div class="form-group mt-3">
        <select v-model="program">
          <option value="Licenta">Licenta</option>
          <option value="Master">Master</option>
          <option value="Doctorat">Doctorat</option>
        </select>
      </div>
      <br />
      <button type="submit" class="btn btn-success mt-3">Add</button>
    </form>
  </div>
</template>

<script>
import utils from "../utils";

export default {
  data() {
    return {
      program: "Licenta",
      name: "",
    };
  },
  methods: {
    addStudent() {
      let requestParameters = { ...utils.globalRequestParameters };
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = "Bearer " + token;
      requestParameters.method = "POST";

      let data = {};
      data.name = this.name;
      data.program = this.program;
      // let sport = { name: "fotbal" };
      // // data.sport = { name: "fotbal" };
      // data.sport.push(sport);
      // data.sport.push({ name: "basket" });
      // data.sport.push(sport);
      // data.sport.push({ name: "asd" });
      console.log(data);

      requestParameters.body = JSON.stringify(data);

      fetch(utils.url + "students", requestParameters)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          if (
            res.message === "Decoding error!" ||
            res.message === "Your token expired!"
          ) {
            console.log("nu ai voie!");
          } else {
            data.id = res.id;
            this.$store.dispatch("addStudent", data);
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style></style>
