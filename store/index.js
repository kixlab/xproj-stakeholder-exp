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
  selectedTag: null,
  browsedTags: [], // let's use this for logging visited tags
  explorationDone: false,
  readCounter1: 0,
  readCounter2: 0,
  keywords: [],
  keywordsHigh: [],
  keywordsLow: [],
  keywordsAll: [],
  predictedEffects: [],
  excludedTag: '',
  tagHigh: null,
  tagHighInfo: {},
  tagLow: null,
  tagLowInfo: {},
  totalPosCount: 0,
  totalNegCount: 0,
  initialOpinion: '',
  initialStance: 0,
  pinnedEffects: []
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
  },
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
  setTags (state, payload) {
    state.tags = payload
  },
  addUsedEffect (state, effect) {
    state.usedEffects.push(effect)
  },
  addUsedEffects (state, effects) {
    state.usedEffects.concat(effects)
  },
  setSelectedTag (state, tag) {
    state.selectedTag = tag
  },
  addBrowsedTag (state, tag) {
    if (state.browsedTags.indexOf(tag) === -1) {
      state.browsedTags.push(tag)
    }
  },
  setKeywords (state, payload) {
    state.keywords = payload
  },
  setTagHigh (state, tagHigh) {
    state.tagHigh = tagHigh
  },
  setTagHighInfo (state, info) {
    state.tagHighInfo = info
  },
  setTagLow (state, tagLow) {
    state.tagLow = tagLow
  },
  setTagLowInfo (state, info) {
    state.tagLowInfo = info
  },
  setKeywordsLow (state, keywords) {
    state.keywordsLow = keywords
  },
  setKeywordsHigh (state, keywords) {
    state.keywordsHigh = keywords
  },
  setKeywordsAll (state, keywords) {
    state.keywordsAll = keywords
  },
  setTotalPosCount (state, posCount) {
    state.totalPosCount = posCount
  },
  setTotalNegCount (state, negCount) {
    state.totalNegCount = negCount
  },
  setInitialStance (state, stance) {
    state.initialStance = stance
  },
  setInitialOpinion (state, opinion) {
    state.initialOpinion = opinion
  },
  addPinnedEffects (state, effects) {
    state.pinnedEffects = state.pinnedEffects.concat(effects)
  },
  removePinnedEffects (state, effects) {
    effects.forEach((effect) => {
      const idx = state.pinnedEffects.findIndex((item) => {
        return item.id === effect.id
      })
      if (idx >= 0) {
        state.pinnedEffects = state.pinnedEffects.splice(idx, 1)
      }
    })
  }
}

export const getters = {
  userGroup (state) {
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
    const tagnroot = await this.$axios.$get('/api/effects/tag_list2/', {
      params: {
        policy: context.state.policyId,
        include_guess: 0
      }
    })
    context.commit('setTotalPosCount', tagnroot.pos_count)
    context.commit('setTotalNegCount', tagnroot.neg_count)
    var tags = tagnroot.children
    console.log(tags)
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
    context.commit('setTagHigh', null)
    context.commit('setTagLow', null)
    context.commit('setTagHighInfo', null)
    context.commit('setTagLowInfo', null)
  },
  async updateSelectedTag (context, tag) {
    try {
      const effects = await this.$axios.$get('/api/effects/', {
        params: {
          policy: context.state.policyId,
          'tag[]': tag,
          page_size: 100,
          include_guess: 0
        }
      })
      context.commit('setSelectedTag', tag)
      context.commit('setEffects', effects.results)
      context.commit('setKeywords', effects.keywords)
    } catch (err) {

    }
  },
  async addBrowsedTags (context, tags) {
    tags.forEach((tag) => { context.commit('addBrowsedTag', tag) })
    // console.log(context.state.browsedTags.length)
    context.dispatch('setUserPolicyEffectsSeen', context.state.browsedTags.length)
    // TODO: put this on DB
  },
  async setTagHigh (context, {tag, effectFilter}) {
    if (tag === null) {
      context.commit('setTagLowInfo', null)
      context.commit('setTagLow', null)
      context.commit('setTagHighInfo', null)
      context.commit('setTagHigh', null)
      try {
        const effects = await this.$axios.$get('/api/effects/', {
          params: {
            policy: context.state.policyId,
            page_size: 200,
            include_guess: 0
            // is_benefit: effectFilter.length === 1 ? effectFilter[0] : null
          }
        })
        context.commit('setEffects', effects.results)
        context.commit('setKeywords', effects.keywords)
        context.commit('setKeywordsHigh', effects.keywords)
      } catch (err) {
      }
    } else {
      try {
        const tagHighInfo = await this.$axios.$get('/api/effects/tag_info2/', {
          params: {
            policy: context.state.policyId,
            tag: tag.tag
          }
        })
        const effects = await this.$axios.$get('/api/effects/', {
          params: {
            policy: context.state.policyId,
            'tag[]': tag.tag,
            page_size: 200,
            include_guess: 0
            // is_benefit: effectFilter.length === 1 ? effectFilter[0] : null
          }
        })
        context.commit('setTagLowInfo', null)
        context.commit('setTagLow', null)
        context.commit('setTagHighInfo', tagHighInfo)
        context.commit('setTagHigh', tag)
        context.commit('setEffects', effects.results)
        context.commit('setKeywords', effects.keywords)
        context.commit('setKeywordsHigh', effects.keywords)
      } catch (err) {

      }
    }
  },
  async setTagLow (context, {tag, isOpening, effectFilter}) {
    if (!isOpening) {
      await context.dispatch('setTagHigh', {tag: context.state.tagHigh, effectFilter: effectFilter})
    } else if (isOpening && context.state.tagHigh.tag === tag.tag) {
    } else {
      context.commit('setTagLow', null)
      try {
        const tagLowInfo = await this.$axios.$get('/api/effects/tag_info3/', {
          params: {
            policy: context.state.policyId,
            tag_high: context.state.tagHigh.tag,
            tag_low: tag.tag
          }
        })
        const effects = await this.$axios.$get('/api/effects/', {
          params: {
            policy: context.state.policyId,
            tag: [context.state.tagHigh.tag, tag.tag],
            page_size: 200,
            include_guess: 0,
            is_and: 1
            // is_benefit: effectFilter.length === 1 ? effectFilter[0] : null
          }
        })
        context.commit('setTagLowInfo', tagLowInfo)
        context.commit('setTagLow', tag)
        context.commit('setEffects', effects.results)
        context.commit('setKeywords', effects.keywords)
      } catch (err) {
      }
    }
  },
  async setInitialOpinion (context, {initialOpinion, initialStance, policy}) {
    context.commit('setInitialOpinion', initialOpinion)
    context.commit('setInitialStance', initialStance)
    // TODO: Add async operation with API
  },
  async addPinnedEffects (context, {effect}) {
    context.commit('addPinnedEffects', [effect])
    // TODO: Add async operation with backend
  },
  async removePinnedEffects (context, {effect}) {
    context.commit('removePinnedEffects', [effect])
  }
}
