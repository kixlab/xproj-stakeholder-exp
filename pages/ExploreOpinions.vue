<template>
  <v-layout row wrap justify-center>
    <promise-pane :policy="policy" />
    <v-flex xs12>
      <v-card color="grey lighten-4">
        <v-card-text>
        이 정책은 우리 사회에 어떤 영향을 끼칠까요?<br>
        이 정책의 이해당사자들은 어떤 영향을 받을까요?
        </v-card-text>
      </v-card>
      &nbsp;

      <p class="body-1">
        * <strong class="red--text">거짓 정보</strong>를 바탕으로 한 내용은 신고해주세요!
        <!--TODO: Disclaimer -->
      </p>
      <v-divider/>
      <v-flex xs12 row wrap>
        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header">정렬/필터</div>
            <v-card>
            <v-combobox
              v-model="model"
              :filter="filter"
              :hide-no-data="!search"
              :items="items"
              :search-input.sync="search"
              hide-selected
              label="태그를 검색하세요"
              multiple
              small-chips
              solo
            >
              <template slot="no-data">
                <v-list-tile>
                  <span class="subheading">새로 만들기</span>
                  <v-chip
                    color="blue lighten-3"
                    label
                    small
                  >
                    {{ search }}
                  </v-chip>
                </v-list-tile>
              </template>
              <template
                v-if="item === Object(item)"
                slot="selection"
                slot-scope="{ item, parent, selected }"
              >
                <v-chip
                  color="blue lighten-3"
                  :selected="selected"
                  label
                  small
                >
                  <span class="pr-2">
                    {{ item.text }}
                  </span>
                  <v-icon
                    small
                    @click="parent.selectItem(item)"
                  >close</v-icon>
                </v-chip>
              </template>
              <template
                slot="item"
                slot-scope="{ index, item, parent }"
              >
                <v-list-tile-content>
                  <v-text-field
                    v-if="editing === item"
                    v-model="editing.text"
                    autofocus
                    flat
                    background-color="transparent"
                    hide-details
                    solo
                    @keyup.enter="edit(index, item)"
                  ></v-text-field>
                  <v-chip
                    v-else
                    :color="`blue lighten-3`"
                    dark
                    label
                    small
                  >
                    {{ item.text }}
                  </v-chip>
                </v-list-tile-content>
                <v-spacer></v-spacer>
                <v-list-tile-action @click.stop>
                  <v-btn
                    icon
                    @click.stop.prevent="edit(index, item)"
                  >
                    <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </template>
            </v-combobox>    



            <v-radio-group row hide-details>
              <v-checkbox label="좋아요" v-model="good_show" hide-details></v-checkbox>
              <v-checkbox label="싫어요" v-model="bad_show" hide-details></v-checkbox>
            </v-radio-group>
          </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-flex v-for="i in cardnum(page)" :key="i">
          <effect-card
            :effect="effects[i+5*(page-1)-1]"
            @empathy-button-click="onEmpathyButtonClick(effect)"
            @novelty-button-click="onNoveltyButtonClick(effect)"/>
        </v-flex>
        <v-pagination
          v-model="page"
          :length="pagenum"/>
      </v-flex>
      
<!--       <v-btn 
        v-if = "active_button"
        color = "success"
        @click="onNextButtonClick"
        block ripple>
        다른 이해당사자의 목소리도 살펴보세요!
      </v-btn> -->
      <v-btn
        :disabled="!$store.state.userToken"
        color="success"
        ripple block
        @click.native="onPostNewEffectButtonClick">
        여러분의 생각도 들려주세요!
      </v-btn>
      <v-divider/>

    <v-btn v-if="!$store.state.userToken" color="primary" dark ripple block @click="onEndButtonClick">
      다른 정책 보기
    </v-btn>
    <v-dialog
      v-else
      v-model="dialog"
      width="500"
      full-width
    >
      <v-btn
        slot="activator"
        color="primary"
        dark ripple block
        @click.native="dialog=true">
        다른 정책 보기
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
          style="background-color:pink !important;
          color:red;"
        > <strong>주의</strong>
        </v-card-title>

        <v-card-text>
          현재 '정책의 다양한 영향 이해' 단계에서는 실험자가 
          <strong>3개 그룹</strong>의 영향을 둘러보셔야 보상을 받을 수 있습니다. <br><br>
          <template v-if="stakeholder_left!=0">
          귀하는 <strong><font size="4">{{stakeholder_left}}개 그룹을</font></strong> 더 살펴보셔야 합니다.<br>
          아래 <strong style="color:red;"> 돌아가기 </strong>를 누르셔서 조건을 충족시키시기 바랍니다.
          <br><br>
          <strong style="color:red;"> (주의) 조건을 충족하지 않고 <span style="color:blue;">다음으로</span>
          넘어가시면, 포기로 간주되며 보상을 받을 수 없습니다. </strong>
          </template>

          <template v-else>
          귀하는 조건을 모두 충족하셨습니다.<br>
          <strong style="color:blue;"> 다음으로 </strong> 넘어가주세요.<br><br>

          그런데, 혹시 더 살펴보고 싶으시면 <strong style="color:red;">돌아가기</strong>를 누르셔도 좋습니다. :)
          </template>          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="red"
            flat outline ripple
            @click="dialog=false"
          > 돌아가기 </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat outline ripple
            @click="onEndButtonClick"
          >
            다음으로
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-flex>
  </v-layout>
</template>
<script>
import EffectCard from '~/components/EffectCard.vue'
import PromisePane from '~/components/PromisePane.vue'
import setTokenMixin from '~/mixins/setToken.js'
export default {
  fetch: async function ({app, store}) {
    if (store.state.userToken) {
      app.$axios.setToken(store.state.userToken, 'Token')
    }
    store.dispatch('incrementUserPolicyStakeholdersSeen')
  },
  mixins: [setTokenMixin],
  components: {
    EffectCard,
    PromisePane
  },
  computed: {
    policy: function () {
      return this.$store.state.policy
    },
    effects: function () {
      console.log(this.$store.state.effects[0])
      return this.$store.state.effects
    },
    stakeholderName: function () {
      return this.$store.getters.randomStakeholderGroup.name
    },
    stakeholder_left: function () {
      if (this.$store.state.userPolicy.stakeholders_seen > 3) {
        return 0
      }
      return 3 - this.$store.state.userPolicy.stakeholders_seen
    },
    effect_left: function () {
      if (this.$store.state.userPolicy.effects_seen > 9) {
        return 0
      }
      return 9 - this.$store.state.userPolicy.effects_seen
    },
    pagenum: function () {
      return Math.ceil(this.effects.length / 5)
    }
  },
  data: function () {
    return {
      opinionTexts: false,
      active_button: true,
      dialog: false,
      page: 1,
      good_show: true,
      bad_show: true,
      activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      index: -1,
      items: [
        { header: 'Select an option or create one' },
        {
          text: 'Foo'
        },
        {
          text: 'Bar'
        }
      ],
      nonce: 1,
      menu: false,
      model: [],
      x: 0,
      search: null,
      y: 0
    }
  },
  methods: {
    onNextButtonClick: function () {
      this.$ga.event({
        eventCategory: '/ExploreOpinions',
        eventAction: 'SeeMoreEffects',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.$router.push('/SelectStakeholder')
    },
    onEndButtonClick: function () {
      this.$ga.event({
        eventCategory: '/ExploreOpinions',
        eventAction: 'ClickEndButton',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      if (!this.$store.state.userToken || !this.$store.state.user.is_participant) {
        this.$router.push('/ShowPolicies')
      } else {
        this.$router.push('/MiniSurvey')
      }
    },
    onPostNewEffectButtonClick: function () {
      this.$ga.event({
        eventCategory: '/ExploreOpinions',
        eventAction: 'AddNewEffect',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.$router.push('/AddNewEffect')
    },
    onNoveltyButtonClick: function (effect) {

    },
    onEmpathyButtonClick: function (effect) {

    },
    onSeeOtherPolicyButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'SeeOtherPolicy',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.dialog = true
    },
    onDialogGoBackButtonClick: function () {
      this.$ga.event({
        eventCategory: this.$router.currentRoute.path,
        eventAction: 'GoBackToEffects',
        eventLabel: this.stakeholderName,
        eventValue: 0
      })
      this.dialog = true
    },
    cardnum: function (page) {
      if (page === this.pagenum) {
        var rest = this.effects.length % 5
        if (rest === 0) {
          return 5
        }
        return rest
      } else {
        return 5
      }
    },
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.index = index
      } else {
        this.editing = null
        this.index = -1
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
    model (val, prev) {
      if (val.length === prev.length) return

      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1]
          }

          this.items.push(v)

          this.nonce++
        }

        return v
      })
    }
  }
}
</script>

