import { createRouter, createWebHistory } from "vue-router";
import StudentList from "../views/StudentList";
import Register from "../views/Register";
import Login from "../views/Login";
import AddStudent from "../views/AddStudent";
import EditStudent from "../views/EditStudent";
import EditSport from "../views/EditSport";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: StudentList,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/addStudent",
    name: "AddStudent",
    component: AddStudent,
  },
  {
    path: "/edit/:id",
    name: "EditStudent",
    component: EditStudent,
  },
  {
    path: "/editsport/:id/:sportId",
    name: "EditSport",
    component: EditSport,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Global navigation guard example
router.beforeEach((to, from, next) => {
  if (to.name === "Register" || to.name === "Login" || to.name === "Home") {
    next();
  } else if (to.name !== "Login" && !store.state.isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
