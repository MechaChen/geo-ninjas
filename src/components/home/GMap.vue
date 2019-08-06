<template>
  <div class="map">
    <div class="google-map" id="map"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "GMap",
  data() {
    return {
      lat: 53,
      lng: -2
    };
  },
  methods: {
    renderMap() {
      const { lat, lng } = this;
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat, lng },
        zoom: 10,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false
      });
    }
  },
  mounted() {
    let user = firebase.auth().currentUser;

    // 取得使用者座標
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;

          // 利用 auth 暫存的 .uid 屬性找到想對應的 doc
          db.collection("users")
            .where("user_id", "==", user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                // 更新找到的使用者的位置
                db.collection("users")
                  .doc(doc.id)
                  .update({
                    geolocation: {
                      lat: pos.coords.latitude,
                      lng: pos.coords.longitude
                    }
                  });
              });
            })
            .then(() => this.renderMap());
        },
        err => {
          console.log(err);
          this.renderMap();
        },
        {
          // 暫存位置最大停留時間
          maximumAge: 60000,
          // 等待幾秒無回應後才發錯誤通知
          timeout: 3000
        }
      );
    } else {
      // 使用預設位置
      this.renderMap();
    }
    this.renderMap();
  }
};
</script>

<style>
.google-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
