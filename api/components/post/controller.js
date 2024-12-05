const TABLA = 'post';
const auth = require('../auth');

module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy');
    }
    function list() {
        return store.list(TABLA);
    }
    function get(id) {
        return store.get(TABLA, id);
    }
    async function create(body,userId) {
        const post = {
            text: body.text,
            userId: userId,
        }
        const userStore = await store.upsert(TABLA, post);
            
        return userStore
    }

    async function update(body) {
        try {
            if(!body.id){
                throw new Error("Id es requerido");
            }
            const post = {
                id: body.id,
                text: body.text,
                userId: userId,
            }
            const userStore = await store.upsert(TABLA, post);
            
            return post
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    return {
        list,
        get,
        create,
        update
    };
}

