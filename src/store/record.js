import firebase from "firebase";
export default{
    actions:{
        async createRecord({commmit, dispatch}, record){
            try{
                const uid = await dispatch('getUid');
                return await firebase.database().ref(`/users/${uid}/records`).push(record);
            }catch(e){
                commmit('setError', e);
                throw e;
            }
        },
        async fetchRecords({commmit, dispatch}){
            try{
                const uid = await dispatch('getUid');
                const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};
                return Object.keys(records).map(key=>({...records[key], id:key}));
            }catch(e){
                commmit('setError', e);
                throw e;
            }
        },
        async fetchRecordById({commmit, dispatch}, id){
            try{
                const uid = await dispatch('getUid');
                console.log('get uid');
                const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {};
                return {...record, id:id};
            }catch(e){
                commmit('setError', e);
                throw e;
            }
        }

    }
}