<template>
  <nav navbar navbar-expand-lg navbar-light bg-light>
    <router-link to="/">Home</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    <router-link v-if="isAuthenticated" to="/addStudent">Adauga</router-link>
    <button v-if="isAuthenticated" @click="logout()" class="btn btn-light m-10">
      Logout
    </button>
    <router-view />
  </nav>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    logout() {
      console.log("Try logout");
      this.$store.commit("SET_AUTH", false);
      window.localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
