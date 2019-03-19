<template>
  <div>
    <loader v-if="onTagLoading"></loader>
    <!-- <v-layout row>
      <v-flex xs12>
      <p class="body-1 prompt"> 
        <strong>(3개 이상 영향이 입력된 )이해당사자 태그를 적게 언급된 것부터 보여드립니다.<br></strong>
        <v-divider/>
        <small>* 아래 태그를 눌러 각 이해당사자들이 받는 영향을 확인해보세요.</small>
      </p>
      </v-flex>
    </v-layout> -->
    <v-layout row class="tree">
      <v-flex xs12 style="overflow: auto;"> 
        <tree-view :model="tags" category="children" :selection="selection" :onSelect="onSelect" :display="display"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { TreeView } from '@bosket/vue'
import TagOverviewItem from '~/components/TagOverviewItem.vue'
import Loader from '~/components/Loader.vue'
export default {
  props: {
    tags: {
      type: Array
    },
    maxValue: {
      type: Number
    },
    category: {
      type: String
    },
    onTagLoading: Boolean
  },
  components: {
    TagOverviewItem,
    TreeView,
    Loader
  },
  data: function () {
    return {
      // tag: null,
      selection: [this.tags[0]]
    }
  },
  methods: {
    onSelect (newSelection) {
      console.log(newSelection)
      this.selection = newSelection
      this.$emit('update-selected-tag', newSelection[0].tag)
    },
    display (item) {
      return <tag-overview-item key={item.tag} tag={item} maxValue={this.maxValue}/>
    }
  }
}
</script>
<style>
ul.depth-0 {
  list-style-type: none; 
  padding-left: 0;
}
ul.depth-1 {
  padding-left: 60px;
  list-style-image: url('https://material.io/tools/icons/static/icons/outline-subdirectory_arrow_right-24px.svg');

}
</style>
<style scoped>
.TreeView {
  width: 100% !important;
  margin-top: 20px;
  margin-bottom: 70px;
}

.tree {
  height: 80vh;
  margin-top: 1vh;
  margin-bottom: 1vh;
  width: 100%;
}
</style>
