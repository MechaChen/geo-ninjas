<template>
  <nav class="deep-purple darken-1">
    <div class="container">
      <div class="nav-wrapper">
        <router-link :to="{ name: 'GMap' }" class="brand-logo left">Geo Ninjas!</router-link>
        <ul class="right">
          <li>
            <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'LogIn' }">Log in</router-link>
          </li>
          <li>
            <a @click="logOut">Log out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    // 利用 firebase 登出
    logOut() {
      firebase
        .auth()
        .signOut()
        // 導回到 Sign Up component 頁面
        .then(() => alert("已登出"))
        .then(() => this.$router.push({ name: "LogIn" }))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>