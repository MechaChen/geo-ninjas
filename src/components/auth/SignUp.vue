<template>
  <div class="sign-up container">
    <form class="card-panel" @submit.prevent="signUp">
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
        <button class="btn">Sign Up</button>
      </div>
      <p class="center">
        <router-link :to="{ name: 'LogIn' }" class="cyan-text">already have an account?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";

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
      let { email, password, alias, slug, feedback } = this;
      if (email && password && alias) {
        //   將暱稱轉換為固定形式， ex : benson-chen, the-net-ninja
        slug = slugify(alias, {
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
          lower: true
        });
        // 取得 users 的 Collection <Table>
        let ref = db.collection("users").doc(slug);
        // 檢查是否有一筆資料 (doc <row> ) 對應到相同暱稱
        ref.get().then(doc => {
          if (doc.exists) {
            // 若存在則回報此暱稱已存在
            this.feedback = "This alias already exists";
          } else {
            // 若都沒有則用 email 和 password 創建新帳號
            // 帳號會儲存於 Authentication
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(cred =>
                ref.set({
                  alias,
                  geolocation: null,
                  user_id: cred.user.uid
                })
              )
              // 告訴使用者創建成功
              .then(() => {
                alert("創建成功");
                // 將使用者導到 GMap component 的頁面
                this.$router.push({ name: "GMap" });
              })
              .catch(err => {
                console.log(err);
                this.feedback = err.message;
              });
          }
        });
        console.log(slug);
      } else {
        this.feedback = "You must enter all fields";
      }
    }
  }
};
</script>

<style>
.sign-up {
  padding-top: 60px;
}

.sign-up form {
  max-width: 50%;
  margin: auto;
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