const bcrypt = require('bcrypt')

const helpers = {}

helpers.encryptpassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helpers.macthpasssword = async(password,savedpassword) => {
    
    
    try{
        return await bcrypt.compare(password, savedpassword)
    }catch(error){
        console.log(error);
    }
}

module.exports = helpers