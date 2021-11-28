<template>
  <div class="container col-6">
    <br />
    <h1>Log In</h1>
    <form @submit.prevent="login()">
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
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
    <div>
      {{ mesaj }}
    </div>
    <div v-if="isShown"></div>
  </div>
</template>

<script>
import utils from "../utils.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      mesaj: "",
    };
  },
  methods: {
    login() {
      console.log(`Vrei sa te autentifici cu email: ${this.email}`);
      console.log(utils.url);

      let data = {
        email: this.email,
        password: this.password,
      };

      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = "POST";
      requestParameters.body = JSON.stringify(data);

      fetch(utils.url + "login", requestParameters).then((res) => {
        res.json().then((res) => {
          this.mesaj = res.message;
          if (res.token) {
            localStorage.setItem("token", res.token);
            this.$store.dispatch("login", true);
          }
          this.$router.push("/");
        });
      });
    },
  },
};
</script>

<style></style>
