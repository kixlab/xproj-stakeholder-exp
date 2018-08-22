// import { isContext } from 'vm'
function shuffle (a) {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

export const state = () => ({
  sidebar: false,
  policyIdx: 1,
  policies: [
  ],
  stakeholderGroups: [
  ],
  userPolicy: {
  },
  predictedEffects: [],
  effects: [],
  myEffect: {},
  stakeholderGroupIdx: 0,
  userToken: null,
  user: {
    email: 'abcdef@kaist.ac.kr',
    expr_group: 0,
    pk: 1,
    step: 1,
    is_participant: true
  },
  selectedStakeholder: '',
  isLookingAround: false
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  setPolicy (state, payload) {
    state.policy = payload
  },
  setPolicyIdx (state, payload) {
    state.policyIdx = payload.policyIdx
  },
  setPredictedEffects (state, payload) {
    state.predictedEffects = payload
  },
  setMyEffect (state, payload) {
    state.myEffect = payload
  },
  setEffects (state, payload) {
    state.effects = payload
  },
  setStakeholderGroups (state, payload) {
    state.stakeholderGroups = shuffle(payload)
  },
  setRandomStakeholderGroup (state) {
    let stakeholderLength = state.stakeholderGroups.length
    let randomNumber = Math.floor(Math.random() * stakeholderLength)
    state.stakeholderGroupIdx = state.stakeholderGroups[randomNumber].id
  },
  setStakeholderGroupIdx (state, idx) {
    state.stakeholderGroupIdx = idx
  },
  setUserToken (state, payload) {
    state.userToken = payload
  },
  setUser (state, payload) {
    state.user = payload
  },
  setLookAround (state, payload) {
    state.isLookingAround = payload
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
    effect.novelty += 1
  },
  incrementEmpathyCount (state, payload) {
    const effect = state.effects.find((value) => {
      console.log(value.id)
      return value.id === payload.effect
    })
    effect.empathy += 1
  }
}

export const getters = {
  randomStakeholderGroup (state) {
    return state.stakeholderGroups.find((sg) => {
      return sg.id === state.stakeholderGroupIdx
    })
  },
  experimentCondition (state) {
    return ((state.user.pk % 4) + 3) % 6
  },
  isLookingAround (state) {
    return !state.userToken || state.isLookingAround
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
  }
}
