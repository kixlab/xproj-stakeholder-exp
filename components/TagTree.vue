<template>
  <v-flex xs12> 
    <tree-view :model="tags" category="children" :selection="selection" :onSelect="onSelect" :display="display"/>
  </v-flex>
</template>

<script>
import { TreeView } from '@bosket/vue'
import TagOverviewItem from '~/components/TagOverviewItem.vue'

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
    }
  },
  components: {
    TagOverviewItem,
    TreeView
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
    },
    display (item) {
      return <tag-overview-item key={item.tag} tag={item} maxValue={this.maxValue}/>
    }
  }
}
</script>
<style>
ul.depth-1 {
  padding-left: 60px;
}
</style>
<style scoped>
.TreeView {
  width: 100% !important;
  margin-top: 20px;
  margin-bottom: 70px;
}


</style>
