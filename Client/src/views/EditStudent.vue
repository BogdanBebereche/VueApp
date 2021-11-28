<template>
  <div class="card card-body mt-4 container">
    <form @submit.prevent="editProduct()">
      <br />
      <div class="row">
        <label class="col-sm-2"> Name </label>
        <input v-model="name" type="text" class="col-sm-8" required />
      </div>
      <div class="form-group mt-3">
        <select v-model="status">
          <option value="true">In Stock</option>
          <option value="false">Out Of Stock</option>
        </select>
      </div>
      <br />
      <button type="submit" class="btn btn-success mt-3">OK</button>
    </form>
  </div>
</template>

<script>
import utils from "../utils";

export default {
  data() {
    return {
      status: false,
      name: "",
    };
  },
  methods: {
    //Submit edit product
    editProduct() {
      let requestParameters = { ...utils.globalRequestParameters };
      let token = window.localStorage.getItem("token");
      requestParameters.headers.Authorization = "Bearer " + token;
      requestParameters.method = "PUT";

      if (this.name === "") return;
      let data = {};
      data.name = this.name;
      data.status = this.status === "In Stock" ? true : false;
      // data.id = this.$route.params.id;
      requestParameters.body = JSON.stringify(data);

      fetch(utils.url + "students/" + this.$route.params.id, requestParameters)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.message);
          if (
            res.message === "Decoding error!" ||
            res.message === "Your token expired!"
          ) {
            console.log("Nu ai voie update!");
          } else {
            data.id = res.id;
            console.log("A ajuns la final");
            let students = fetch(
              utils.url + "students",
              utils.requestParameters
            );
            this.$store.dispatch("fetchStudents", students);
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style></style>
