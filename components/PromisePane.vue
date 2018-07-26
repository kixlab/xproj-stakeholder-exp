
<!--
<template>
  <v-flex xs12>

    <a @click.prevent="showDetails = !showDetails">{{promise.title}}</a>
    <v-slide-y-transition>
      <div v-show="showDetails">
        {{promise.description}}
      </div>
    </v-slide-y-transition>

  </v-flex>
</template>
-->
<template>
  <v-app id="inspire">
    <v-toolbar dense color="indigo" @click.stop="dialog = true" dark fixed app>
      <v-toolbar-title>
        <div style="cursor: pointer;">
          <!-- Length of policy name should be less than 18 Korean syllables -->
          <!-- The line must be ended with a single space -->
          <!-- <small>복합쇼핑몰에 대한 입지제한과 영업제한 </small>  -->
          <v-icon dark>arrow_drop_down</v-icon>
        </div>
      </v-toolbar-title>
      
      <v-dialog
        v-model = "dialog"
        max-width = "290"
      >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          복합쇼핑몰에 대한<br>
          입지제한과 영업제한
        </v-card-title>

        <v-card-text>
          정부는 신세계 스타필드, 이케아 등 복합쇼핑몰 및 전문점에 대해 영업, 출점을 제한하는 규제법안을 추진하고 있다.<br><br>
          정부는 이 정책을 통해 <strong>재래시장 및 상점가 등 소상공인을 보호할 수 있을 것</strong>으로 내다봤다.<br><br>
          그러나 유통업계는 <strong>소비자 권리를 침해할 뿐만 아니라, 경제에 끼칠 악영향을 우려한다</strong>며 반발했다.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            다 읽었어요!
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </v-toolbar>

  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dialog: false
    }),
    props: {
      source: String
    }
  }
</script>


