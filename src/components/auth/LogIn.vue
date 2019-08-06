<template>
  <div class="log-in container">
    <form class="card-panel" @submit.prevent="logIn">
      <h2 class="center deep-purple-text">Log in</h2>
      <div class="input-field">
        <input type="email" name="email" id="email" v-model="email">
        <label for="email">Email :</label>
      </div>
      <div class="input-field">
        <input type="password" name="password" id="password" v-model="password">
        <label for="password">Password :</label>
      </div>
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
      <div class="input-field center">
        <button class="btn">Log in</button>
      </div>
      <p class="center">
        <router-link :to="{ name: 'SignUp' }" class="cyan-text">Don't have account yet?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    logIn() {
      const { email, password } = this;
      if (email && password) {
        firebase
          .auth()
          //   利用 firebase 用 email 和 password 登入
          .signInWithEmailAndPassword(email, password)
          //   導回到 GMap component 頁面
          .then(() => this.$router.push({ name: "GMap" }))
          .catch(err => (this.feedback = err.message));
      } else {
        this.feedback = "Please fill in both fields";
      }
    }
  }
};
</script>

<style>
.log-in {
  padding-top: 60px;
}

.log-in form {
  margin: auto;
  max-width: 50%;
}
</style>
