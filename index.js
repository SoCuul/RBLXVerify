//RBLXVerify
//Written by SoCuul

const axios = require('axios');

//List of verification services
module.exports.services = ['bloxlink', 'rover', 'rowifi', 'rbxbolt']

//Bloxlink
async function bloxlink(discordid, guildid) {
    //Check for variables
    if(!discordid) throw new Error('No Discord ID was provided')

    //Check for variable types
    if(typeof discordid !== "string") throw new TypeError('The provided Discord ID must be a string')
    if(guildid && typeof guildid !== "string") throw new TypeError('The provided guild ID must be a string')

    //Check for variable validity
    //Discord ID
    try{
        let int = BigInt(discordid)
        if(int < 0) throw new Error("Negative")
    }
    catch(error){
        throw new TypeError('The provided Discord ID must only contain valid positive integers')
    }
    //Guild ID
    try{
        if(guildid){
            let int = BigInt(guildid)
            if(int < 0) throw new Error("Negative")
        }
    }
    catch(error){
        throw new TypeError('The provided guild ID must only contain valid positive integers')
    }

    //Prepare for verifyError
    let verifyError = null

    try{
        //Make bloxlink request
        const verifyRequest = await axios.get('https://api.blox.link/v1/user/' + discordid, {
            params: {
                guild: guildid
            }
        })

        //Check for bloxlink errors
        if(verifyRequest.data && verifyRequest.data.status && verifyRequest.data.status === 'error'){
            verifyError = {
                status: verifyRequest.status,
                data: verifyRequest.data
            }

            throw new Error('verifyError')
        }
        
        //Make roblox request
        const robloxRequest = await axios.get(`https://users.roblox.com/v1/users/${verifyRequest.data.matchingAccount ? verifyRequest.data.matchingAccount : verifyRequest.data.primaryAccount}`)

        let response = {
            "status": "success"
        }

        //Set roblox id
        if(robloxRequest.data && robloxRequest.data.id){
            response.robloxID = robloxRequest.data.id
        }
        else{
            response.robloxID = verifyRequest.data.matchingAccount || verifyRequest.data.primaryAccount || null
        }

        //Set roblox username
        if(robloxRequest.data && robloxRequest.data.name){
            response.robloxUsername = robloxRequest.data.name
        }
        else{
            response.robloxUsername = null
        }

        //Return information
        return response
    }
    catch(error){
        let errorResponse = {
            "status": "error"
        }

        //Set error code
        if(verifyError && verifyError.status){
            errorResponse.errorCode = verifyError.status
        }
        else if(error.response && error.response.status){
            errorResponse.errorCode = error.response.status
        }
        else{
            errorResponse.errorCode = null
        }

        //Set error type
        if(verifyError && verifyError.data && verifyError.data.status && verifyError.data.status === 'error'){
            errorResponse.errorType = 'bloxlink'
        } 
        else if(error.response && error.response.data && error.response.data.errors && error.response.data.errors[0]){
            errorResponse.errorType = 'roblox'
        }
        else{
            errorResponse.errorType = 'node'
        }

        //Set error
        if(errorResponse.errorType === 'bloxlink'){
            if(verifyError.data.error){
                errorResponse.error = verifyError.data.error
                errorResponse.rawError = verifyError.data
            }
            else{
                errorResponse.error = 'View rawError'
                errorResponse.rawError = verifyError.data
            }
        }
        else if(errorResponse.errorType === 'roblox'){
            if(error.response.data.errors[0].message){
                errorResponse.error = error.response.data.errors[0].message
                errorResponse.rawError = error.response.data.errors[0]
            }
            else{
                errorResponse.error = 'View rawError'
                errorResponse.rawError = error.response.data.errors[0]
            }
        }
        else if(errorResponse.errorType === 'node'){
            errorResponse.error = error
            errorResponse.rawError = null
        }
        else{
            errorResponse.error = null
        }

        //Return error info
        return errorResponse
    }
}

//RoVer
async function rover(discordid) {
    //Check for variables
    if(!discordid) throw new Error('No Discord ID was provided')

    //Check for variable types
    if(typeof discordid !== "string") throw new TypeError('The provided Discord ID must be a string')
    
    //Check for variable validity
    //Discord ID
    try{
        let int = BigInt(discordid)
        if(int < 0) throw new Error("Negative")
    }
    catch(error){
        throw new TypeError('The provided Discord ID must only contain valid positive integers')
    }

    try{
        //Make RoVer request
        const verifyRequest = await axios.get('https://verify.eryn.io/api/user/' + discordid)
        
        let response = {
            "status": "success"
        }

        //Set roblox id
        if(verifyRequest.data && verifyRequest.data.robloxId){
            response.robloxID = verifyRequest.data.robloxId
        }
        else{
            response.robloxID = null
        }

        //Set roblox username
        if(verifyRequest.data && verifyRequest.data.robloxUsername){
            response.robloxUsername = verifyRequest.data.robloxUsername
        }
        else{
            response.robloxUsername = null
        }

        //Return information
        return response
    }
    catch(error){
        let errorResponse = {
            "status": "error"
        }

        //Set error code
        if(error.response && error.response.status){
            errorResponse.errorCode = error.response.status
        }
        else{
            errorResponse.errorCode = null
        }

        //Set error type
        if(error.response && error.response.data && error.response.data.status && error.response.data.status === 'error'){
            errorResponse.errorType = 'rover'
        }
        else{
            errorResponse.errorType = 'node'
        }

        //Set error
        if(errorResponse.errorType === 'rover'){
            if(error.response.data.error){
                errorResponse.error = error.response.data.error
                errorResponse.rawError = error.response.data
            }
            else{
                errorResponse.error = 'View rawError'
                errorResponse.rawError = error.response.data
            }
        }
        else if(errorResponse.errorType === 'node'){
            errorResponse.error = error
            errorResponse.rawError = null
        }
        else{
            errorResponse.error = null
        }

        //Return error info
        return errorResponse
    }
}

//RoWifi
async function rowifi(discordid, guildid) {
    //Check for variables
    if(!discordid) throw new Error('No Discord ID was provided')

    //Check for variable types
    if(typeof discordid !== "string") throw new TypeError('The provided Discord ID must be a string')
    if(guildid && typeof guildid !== "string") throw new TypeError('The provided guild ID must be a string')

    //Check for variable validity
    //Discord ID
    try{
        let int = BigInt(discordid)
        if(int < 0) throw new Error("Negative")
    }
    catch(error){
        throw new TypeError('The provided Discord ID must only contain valid positive integers')
    }
    //Guild ID
    try{
        if(guildid){
            let int = BigInt(guildid)
            if(int < 0) throw new Error("Negative")
        }
    }
    catch(error){
        throw new TypeError('The provided guild ID must only contain valid positive integers')
    }

    //Prepare for verifyError
    let verifyError = null

    try{
        //Make rowifi request
        const verifyRequest = await axios.get('https://api.rowifi.link/v1/users/' + discordid + `${guildid ? `?guildid=${guildid}` : ''}`)

        //Check for rowifi errors
        if(verifyRequest.data && typeof verifyRequest.data.success !== 'undefined' && verifyRequest.data.success === false){
            verifyError = {
                status: verifyRequest.status,
                data: verifyRequest.data
            }

            throw new Error('verifyError')
        }
        
        //Make roblox request
        const robloxRequest = await axios.get(`https://users.roblox.com/v1/users/${verifyRequest.data.roblox_id}`)

        let response = {
            "status": "success"
        }

        //Set roblox id
        if(robloxRequest.data && robloxRequest.data.id){
            response.robloxID = robloxRequest.data.id
        }
        else{
            response.robloxID = verifyRequest.data.roblox_id || null
        }

        //Set roblox username
        if(robloxRequest.data && robloxRequest.data.name){
            response.robloxUsername = robloxRequest.data.name
        }
        else{
            response.robloxUsername = null
        }

        //Return information
        return response
    }
    catch(error){
        let errorResponse = {
            "status": "error"
        }

        //Set error code
        if(verifyError && verifyError.status){
            errorResponse.errorCode = verifyError.status
        }
        else if(error.response && error.response.status){
            errorResponse.errorCode = error.response.status
        }
        else{
            errorResponse.errorCode = null
        }

        //Set error type
        if(verifyError && verifyError.data &&  typeof verifyError.data.success !== 'undefined' && verifyError.data.success === false){
            errorResponse.errorType = 'rowifi'
        }
        else if(error.response && error.response.data && error.response.data.errors && error.response.data.errors[0]){
            errorResponse.errorType = 'roblox'
        }
        else{
            errorResponse.errorType = 'node'
        }

        //Set error
        if(errorResponse.errorType === 'rowifi'){
            if(verifyError.data.message){
                errorResponse.error = verifyError.data.message
                errorResponse.rawError = verifyError.data
            }
            else{
                errorResponse.error = 'View rawError'
                errorResponse.rawError = verifyError.data
            }
        }
        else if(errorResponse.errorType === 'roblox'){
            if(error.response.data.errors[0].message){
                errorResponse.error = error.response.data.errors[0].message
                errorResponse.rawError = error.response.data.errors[0]
            }
            else{
                errorResponse.error = 'View rawError'
                errorResponse.rawError = error.response.data.errors[0]
            }
        }
        else if(errorResponse.errorType === 'node'){
            errorResponse.error = error
            errorResponse.rawError = null
        }
        else{
            errorResponse.error = null
        }

        //Return error info
        return errorResponse
    }
}

//RBXBolt
async function rbxbolt(discordid, key) {
    //Check for variables
    if(!discordid) throw new Error('No Discord ID was provided')
    if(!key) throw new Error('No API key was provided')

    //Check for variable types
    if(typeof discordid !== "string") throw new TypeError('The provided Discord ID must be a string')
    if(typeof key !== "string") throw new TypeError('The provided API Key must be a string')

    //Check for variable validity
    //Discord ID
    try{
        let int = BigInt(discordid)
        if(int < 0) throw new Error("Negative")
    }
    catch(error){
        throw new TypeError('The provided Discord ID must only contain valid positive integers')
    }

    //Prepare for verifyError
    let verifyError = null

    try{
        //Make rbxbolt request
        const verifyRequest = await axios.get('https://api.rbxbolt.com/v1/discord/' + discordid + `?key=${key}`)

        //Check for rbxbolt errors
        if(verifyRequest.data && typeof verifyRequest.data.success !== 'undefined' && verifyRequest.data.success === false){
            verifyError = {
                status: verifyRequest.status,
                data: verifyRequest.data
            }

            throw new Error('verifyError')
        }

        let response = {
            "status": "success"
        }

        //Set roblox id
        if(verifyRequest.data && verifyRequest.data.UserId && Number(verifyRequest.data.UserId)){
            response.robloxID = Number(verifyRequest.data.UserId)
        }
        else{
            response.robloxID = null
        }

        //Set roblox username
        if(verifyRequest.data && verifyRequest.data.Username){
            response.robloxUsername = verifyRequest.data.Username
        }
        else{
            response.robloxUsername = null
        }

        //Return information
        return response
    }
    catch(error){
        let errorResponse = {
            "status": "error"
        }

        //Set error code
        if(verifyError && verifyError.status){
            errorResponse.errorCode = verifyError.status
        }
        else if(error.response && error.response.status){
            errorResponse.errorCode = error.response.status
        }
        else{
            errorResponse.errorCode = null
        }

        //Set error type
        if(verifyError && verifyError.data &&  typeof verifyError.data.success !== 'undefined' && verifyError.data.success === false){
            errorResponse.errorType = 'rbxbolt'
        }
        else{
            errorResponse.errorType = 'node'
        }

        //Set error
        if(errorResponse.errorType === 'rbxbolt'){
            if(verifyError.data.message){
                errorResponse.error = verifyError.data.message
                errorResponse.rawError = verifyError.data
            }
            else if(verifyError.data.error){
                errorResponse.error = verifyError.data.error
                errorResponse.rawError = verifyError.data
            }
            else{
                errorResponse.error = 'View rawError'
                errorResponse.rawError = verifyError.data
            }
        }
        else if(errorResponse.errorType === 'node'){
            errorResponse.error = error
            errorResponse.rawError = null
        }
        else{
            errorResponse.error = null
        }

        //Return error info
        return errorResponse
    }
}

//Export functions
module.exports.bloxlink = bloxlink
module.exports.rover = rover
module.exports.rowifi = rowifi
module.exports.rbxbolt = rbxbolt