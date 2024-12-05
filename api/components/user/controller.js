// const nanoid = require('nanoid');
const TABLA = 'user';
const auth = require('../auth');
// async function generateUserId() {
//     const { nanoid } = await import('nanoid');  // Importación dinámica
//     const id = await nanoid();
//     return id;
//   }
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
    async function create(body) {
        const user = {
            name: body.name,
            username: body.username,
        }
        // const existUser = await store.checkIfUserExists(user.username,user.name);
        // console.log("🚀 ~ create ~ existUser:", existUser)
        
        // if (existUser) {
        //     const error = new Error("Usuario ya creado con esos datos");
        //     error.statusCode = 409; // Código HTTP 409 para conflicto
        //     throw error;  // Lanza el error con un código de estado adecuado
        // }
        const userStore = await store.upsert(TABLA, user);
            
        if(body.password || body.username){
        const authStore = await auth.upsert({
            username: user.username,
            password: body.password,
            userId : userStore.insertId
            })
        }
        return user
    }

    async function update(body) {
        try {
            if(!body.id){
                throw new Error("Id es requerido");
            }
            const user = {
                id: body.id,
                name: body.name,
                username: body.username,
            }
            const userStore = await store.upsert(TABLA, user);
            
            // if(body.password || body.username){
            //     const authStore = await auth.upsert({
            //         username: user.username,
            //         password: body.password,
            //         userId : userStore.insertId
            //     })
            // }
            return user
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    function remove(id) {
        return store.remove(TABLA, id);
    }

    async function follow(from, to) {
        return store.upsert(TABLA+'_follow',{
            user_from: from,
            user_to: to,
        });
    }

    async function following(user) {
        const join = {}
        join[TABLA] = 'user_to'; // { user: 'user_to' }
        const query = { user_from: user };
		
		return await store.query(TABLA + '_follow', query, join);
	}

    return {
        list,
        get,
        create,
        update,
        remove,
        follow,
        following,
    };
}

