// const nanoid = require('nanoid');
const TABLA = 'user';
const auth = require('../auth');
async function generateUserId() {
    const { nanoid } = await import('nanoid');  // Importación dinámica
    const id = await nanoid();
    return id;
  }
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
    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }
        if(body.id){
            user.id = body.id;
        }else{
            user.id = await generateUserId();
        }
        if(body.password || body.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }
        return store.upsert(TABLA, user);
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }
    return {
        list,
        get,
        upsert,
        remove
    };
}

