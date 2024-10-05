const bcrypt = require('bcrypt');
const auth = require('../../../auth')
const TABLA = 'auth';
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
    async function login(username,password){
        const data = await store.query(TABLA,{username: username});
        const compare = await bcrypt.compare(password, data.password);

        if(compare === true){
            //Generar el token
            return await auth.sign(data);
        }else{
            throw new Error('Informacion ivalida')
        }
    }
    async function upsert(data) {
        const authData = {
            id: data.id,
        };

        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5);
        }
        return store.upsert(TABLA, authData);
    }
    return {
        upsert,
        login
    };
}