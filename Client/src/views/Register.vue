<template>
  <div class="container col-6">
    <br />
    <h1>Register</h1>
    <form @submit.prevent="register()">
      <div class="row mb-3">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="inputEmail3"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="inputPassword3" class="col-sm-2 col-form-label"
          >Password</label
        >
        <div class="col-sm-10">
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="inputPassword3"
          />
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <div>
      {{ mesaj }}
    </div>
  </div>
</template>

<script>
import utils from "../utils.js";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      mesaj: "",
    };
  },
  methods: {
    register() {
      console.log(`Vrei sa te inregistrezi cu email: ${this.email}`);
      console.log(utils.url);

      let data = {
        email: this.email,
        password: this.password,
      };

      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "POST";
      requestParameters.body = JSON.stringify(data);

      fetch(utils.url + "user", requestParameters).then((res) => {
        res.text().then((res) => (this.mesaj = res));
      });
    },
  },
};
</script>

<style></style>
