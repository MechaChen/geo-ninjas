<template>
  <div class="sign-up container">
    <form action class="card-panel" @submit.prevent="signUp">
      <h2 class="center deep-purple-text">Sign Up</h2>
      <div class="input-field">
        <input type="email" name="email" id="email" v-model="email">
        <label for="email">Email :</label>
      </div>
      <div class="input-field">
        <input type="password" name="password" id="password" v-model="password">
        <label for="password">Password :</label>
      </div>
      <div class="input-field">
        <input type="text" name="alias" id="alias" v-model="alias">
        <label for="alias">Alias :</label>
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="input-field center">
        <button class="btn deep-purple">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";

export default {
  name: "SignUp",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      slug: null,
      feedback: null
    };
  },
  methods: {
    signUp() {
      let { alias, slug, feedback } = this;
      if (alias) {
        //   將暱稱轉換為固定形式， ex : benson-chen, the-net-ninja
        slug = slugify(alias, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        });
        // 取得 users 的 Collection(Table)
        let ref = db.collection("users").doc(slug);
        // 檢查是否有一筆資料 (doc) 對應到相同暱稱
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "This alias already exists";
          } else {
            this.feedback = "This alias is free to use";
          }
        });
        console.log(slug);
      } else {
        feedback = "You must enter an alias";
      }
    }
  }
};
</script>

<style>
.sign-up {
  max-width: 30%;
  padding-top: 60px;
}

.input-field {
  width: 80%;
  margin: auto;
  padding-bottom: 6%;
}

p {
  margin: 0 0 10% 0;
}
</style>