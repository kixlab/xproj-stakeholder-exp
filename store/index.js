export const state = () => ({
  sidebar: false,
  policyId: 1,
  policies: [
  ],
  policy: {},
  userPolicy: {
  },
  effects: [],
  userToken: null,
  user: {
    email: 'abcdef@kaist.ac.kr',
    experiment_condition: -1,
    pk: 1,
    step: 1,
    is_participant: false
  },
  tags: [],
  randomEffect: {},
  usedEffects: [],
  selectedTag: null,
  browsedTags: [],
  guessedTags: [],
  explorationDone: false,
  readCounter1: 0,
  readCounter2: 0
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setPolicy (state, payload) {
    state.policy = payload
    state.policyId = payload.id
    state.selectedTag = null
    state.browsedTags = []
    state.usedEffects = []
    state.guessedTags = []
  },
  // setPolicyId (state, payload) {
  //   state.policyId = payload.policyId
  // },
  setEffects (state, payload) {
    state.effects = payload
  },
  setUserToken (state, payload) {
    state.userToken = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  setUserPolicy (state, payload) {
    state.userPolicy = payload
  },
  setUserPolicyEffectSize (state, payload) {
    state.userPolicy.effect_size = payload
  },
  incrementUserPolicysStakeholdersAnswered (state) {
    state.userPolicy.stakeholders_answered += 1
  },
  incrementUserPolicyStakeholdersSeen (state) {
    state.userPolicy.stakeholders_seen += 1
  },
  setNextstep (state) {
    state.user.step += 1
  },
  setPolicies (state, payload) {
    state.policies = payload
  },
  logout (state) {
    state.user = {}
    state.userToken = null
  },
  finishPresurvey (state) {
    state.user.presurvey_done = true
  },
  incrementNoveltyCount (state, payload) {
    const effect = state.effects.find((value) => {
      return value.id === payload.effect
    })
    effect.novelty.push(state.user.pk)
  },
  incrementEmpathyCount (state, payload) {
    const effect = state.effects.find((value) => {
      // console.log(value.id)
      return value.id === payload.effect
    })
    effect.empathy.push(state.user.pk)
  },
  incrementFishyCount (state, payload) {
    const effect = state.effects.find((value) => {
      // console.log(value.id)
      return value.id === payload.effect
    })
    effect.fishy.push(state.user.pk)
  },
  decrementEmpathyCount (state, payload) {
    const effect = state.effects.find((value) => {
      // console.log(value.id)
      return value.id === payload.effect
    })
    const idx = effect.empathy.indexOf(state.user.pk)
    effect.empathy.splice(idx, 1)
  },
  decrementFishyCount (state, payload) {
    const effect = state.effects.find((value) => {
      // console.log(value.id)
      return value.id === payload.effect
    })
    const idx = effect.fishy.indexOf(state.user.pk)
    effect.fishy.splice(idx, 1)
  },
  decrementNoveltyCount (state, payload) {
    const effect = state.effects.find((value) => {
      // console.log(value.id)
      return value.id === payload.effect
    })
    const idx = effect.novelty.indexOf(state.user.pk)
    effect.novelty.splice(idx, 1)
  },
  setTags (state, payload) {
    state.tags = payload
  },
  setRandomEffect (state, randomEffect) {
    state.randomEffect = randomEffect
  },
  addUsedEffect (state, effect) {
    state.usedEffects.push(effect)
  },
  setSelectedTag (state, tag) {
    if (state.browsedTags.indexOf(tag) === -1) {
      state.browsedTags.push(tag)
    }
    state.selectedTag = tag
  },
  addBrowsedTag (state, tag) {
    if (state.browsedTags.indexOf(tag) === -1) {
      state.browsedTags.push(tag)
    }
  },
  addGuessedTags (state, tags) {
    state.guessedTags.push(tags)
  },
  setReadCounter1 (state, t) {
    state.readCounter1 = t
  },
  setReadCounter2 (state, t) {
    state.readCounter2 = t
  }
}

export const getters = {
  userGroup (state) {
    // return ((state.user.pk % 4) + 3) % 6
    // return state.user.pk % 6
    // return 0
    return state.user.experiment_condition
  },
  isLookingAround (state) {
    return !state.userToken
  }
}

export const actions = {
  async setUserPolicyEffectSize (context, effectSize) {
    if (context.state.userToken) {
      const userpolicyId = context.state.userPolicy.id
      const userPolicy = Object.assign({}, context.state.userPolicy)
      userPolicy.effect_size = effectSize
      context.commit('setUserPolicy', userPolicy)
      await this.$axios.$put(`/api/userpolicy/${userpolicyId}/`, userPolicy)
    }
  },
  async incrementUserPolicyStakeholdersSeen (context) {
    if (context.state.userToken) {
      const userpolicyId = context.state.userPolicy.id
      const userPolicy = Object.assign({}, context.state.userPolicy)
      userPolicy.stakeholders_seen += 1
      context.commit('setUserPolicy', userPolicy)
      await this.$axios.$put(`/api/userpolicy/${userpolicyId}/`, userPolicy)
    }
  },
  async incrementUserPolicyStakeholdersAnswered (context) {
    if (context.state.userToken) {
      const userpolicyId = context.state.userPolicy.id
      const userPolicy = Object.assign({}, context.state.userPolicy)
      userPolicy.stakeholders_answered += 1
      context.commit('setUserPolicy', userPolicy)
      await this.$axios.$put(`/api/userpolicy/${userpolicyId}/`, userPolicy)
    }
  },
  async incrementUserPolicyArticlesSeen (context) {
    if (context.state.userToken) {
      const userpolicyId = context.state.userPolicy.id
      const userPolicy = Object.assign({}, context.state.userPolicy)
      userPolicy.articles_seen += 1
      context.commit('setUserPolicy', userPolicy)
      await this.$axios.$put(`/api/userpolicy/${userpolicyId}/`, userPolicy)
    }
  },
  async incrementUserPolicyEffectsSeen (context) {
    if (context.state.userToken) {
      const userpolicyId = context.state.userPolicy.id
      const userPolicy = Object.assign({}, context.state.userPolicy)
      userPolicy.effects_seen += 1
      context.commit('setUserPolicy', userPolicy)
      await this.$axios.$put(`/api/userpolicy/${userpolicyId}/`, userPolicy)
    }
  },
  async setUserPolicyEffectsSeen (context, num) {
    if (context.state.userToken) {
      const userpolicyId = context.state.userPolicy.id
      const userPolicy = Object.assign({}, context.state.userPolicy)
      userPolicy.effects_seen = num
      context.commit('setUserPolicy', userPolicy)
      await this.$axios.$put(`/api/userpolicy/${userpolicyId}/`, userPolicy)
    }
  },
  async setUserPolicyIdentifyDone (context) {
    if (context.state.userToken) {
      const userpolicyId = context.state.userPolicy.id
      const userPolicy = Object.assign({}, context.state.userPolicy)
      userPolicy.identify_done = true
      context.commit('setUserPolicy', userPolicy)
      await this.$axios.$put(`/api/userpolicy/${userpolicyId}/`, userPolicy)
    }
  },
  async setUserPolicyGuessDone (context) {
    if (context.state.userToken) {
      const userpolicyId = context.state.userPolicy.id
      const userPolicy = Object.assign({}, context.state.userPolicy)
      userPolicy.guess_done = true
      context.commit('setUserPolicy', userPolicy)
      await this.$axios.$put(`/api/userpolicy/${userpolicyId}/`, userPolicy)
    }
  },
  async incrementUserStep (context) {
    context.commit('setNextstep')
    if (context.state.userToken) {
      const user = context.state.user
      await this.$axios.$put('/api/auth/user/', {
        username: user.email,
        step: user.step,
        is_participant: user.is_participant,
        presurvey_done: user.presurvey_done
      })
    }
  },
  async finishPresurvey (context) {
    context.commit('finishPresurvey')
    if (context.state.userToken) {
      const user = context.state.user
      await this.$axios.$put('/api/auth/user/', {
        username: user.email,
        step: user.step,
        is_participant: user.is_participant,
        presurvey_done: user.presurvey_done
      })
    }
  },
  async setTags (context) {
    const tags = await this.$axios.$get('/api/effects/tag_list/', {
      params: {
        policy: context.state.policyId
      }
    })
    tags.sort((a, b) => {
      if (a.total_count < b.total_count) {
        return 1
      } else if (a.total_count > b.total_count) {
        return -1
      } else {
        return 0
      }
    })
    context.commit('setTags', tags)
  },
  async fetchRandomEffect (context) {
    const usedEffectIds = context.state.usedEffects.map((x) => { return x.id })
    try {
      const randomEffect = await this.$axios.$get('/api/effects/random/', {
        params: {
          policy: context.state.policyId,
          exclude: usedEffectIds
        }
      })
      context.commit('addGuessedTags', randomEffect.tags)
      context.commit('addUsedEffect', randomEffect)
      context.commit('setRandomEffect', randomEffect)
    } catch (err) {
      if (err.response.status === 404) {
        context.commit('setRandomEffect', null)
      }
    }
  },
  async addBrowsedTags (context, tags) {
    tags.forEach((tag) => { context.commit('addBrowsedTag', tag) })
    // console.log(context.state.browsedTags.length)
    context.dispatch('setUserPolicyEffectsSeen', context.state.browsedTags.length)
    // TODO: put this on DB
  },
  async startExploration (context) {
    setTimeout(() => {
      context.explorationDone = true
    }, 120000)
  }
}
