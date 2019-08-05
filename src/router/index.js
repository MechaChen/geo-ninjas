import Vue from "vue";
import Router from "vue-router";
import GMap from "@/components/home/GMap";
import SignUp from "@/components/auth/SignUp";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "GMap",
      component: GMap
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp
    }
  ]
});
