import firebase from "firebase";
export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
        clearInfo(state) {
            state.info = null;
        }
    },
    actions: {
        async fetchInfo({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUid');
                const info = await (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
                commit('setInfo', info);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        },
        async updateInfo({ dispatch, commit, getters}, toUpdate) {
            try {
                const uid = await dispatch('getUid');
                const updateData = {...getters.info, ...toUpdate};
                await firebase.database().ref(`/users/${uid}/info`).update(toUpdate)
                commit('setInfo', updateData);
            } catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    },
    getters: {
        info: s => s.info
    }
}