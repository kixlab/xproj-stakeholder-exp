<template>
  <div class="test">
      <v-app>
        <v-content>
          <v-container grid-list-md text-xs-center>
            <!-- <div class="test">
              <div class="cover"> -->
                <nuxt />
              <!-- </div>
            </div> -->
          </v-container>
        </v-content>
      </v-app>
  </div>
</template>

<script>

</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&subset=korean');
.cover {
  height:100%;
  padding: 6px;
  background-color:rgba(0, 0, 0, 0.8);
}
.test {
/*   background-image: url('https://images.pexels.com/photos/910332/pexels-photo-910332.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'); */
  /* background-image: url('/static/asdf.jpg'); */
  /* background-color: rgb(67, 122, 241); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0;
  /* height: 100%;
  width: 100%; */
}
#app {
  background: rgba(255,255,255,0.2) !important;
}

.container.grid-list-md.text-xs-center {
  padding: 8px;
}
* {
  font-family: 'Nanum Gothic', sans-serif;
}
</style>
