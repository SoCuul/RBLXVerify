//RBLXVerify
//Written by SoCuul

const axios = require('axios');

//Bloxlink
async function bloxlink(discordid, guildid) {
    //Check for variables
    if(!discordid) throw new Error('No Discord ID was provided')

    //Check for variable types
    if(typeof discordid !== "string") throw new TypeError('The provided Discord ID must be a string')
    if(guildid && typeof guildid !== "string") throw new TypeError('The provided guild ID must be a string')

    if(isNaN(discordid)) throw new TypeError('The provided Discord ID must contain valid numbers')
    if(guildid && isNaN(guildid)) throw new TypeError('The provided guild ID must contain valid numbers')

    //Prepare for bloxlinkError
    let bloxlinkError = null

    try{
        //Make bloxlink request
        const bloxlinkRequest = await axios.get('https://api.blox.link/v1/user/' + discordid, {
            params: {
                guild: guildid
            }
        })

        //Check for bloxlink errors
        if(bloxlinkRequest.data && bloxlinkRequest.data.status && bloxlinkRequest.data.status === 'error'){
            bloxlinkError = {
                status: bloxlinkRequest.status,
                data: bloxlinkRequest.data
            }

            throw new Error('bloxlinkError')
        }
        
        //Make roblox request
        const robloxRequest = await axios.get(`https://users.roblox.com/v1/users/${bloxlinkRequest.data.matchingAccount ? bloxlinkRequest.data.matchingAccount : bloxlinkRequest.data.primaryAccount}`)

        let response = {
            "status": "success"
        }

        //Set roblox id
        if(robloxRequest.data && robloxRequest.data.id){
            response.robloxID = robloxRequest.data.id
        }
        else{
            response.robloxID = bloxlinkRequest.data.matchingAccount || bloxlinkRequest.data.primaryAccount || null
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
        if(bloxlinkError && bloxlinkError.status){
            errorResponse.errorCode = bloxlinkError.status
        }
        else if(error.response && error.response.status){
            errorResponse.errorCode = error.response.status
        }
        else{
            errorResponse.errorCode = null
        }

        //Set error type
        if(bloxlinkError && bloxlinkError.data && bloxlinkError.data.status && bloxlinkError.data.status === 'error'){
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
            errorResponse.error = bloxlinkError.data.error ? bloxlinkError.data.error : bloxlinkError.data
        }
        else if(errorResponse.errorType === 'roblox'){
            errorResponse.error = error.response.data.errors[0].message ? error.response.data.errors[0].message : error.response.data.errors[0]
        }
        else if(errorResponse.errorType === 'node'){
            errorResponse.error = error
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
    
    if(isNaN(discordid)) throw new TypeError('The provided Discord ID must contain valid numbers')

    try{
        //Make RoVer request
        const request = await axios.get('https://verify.eryn.io/api/user/' + discordid)
        
        let response = {
            "status": "success"
        }

        //Set roblox id
        if(request.data && request.data.robloxId){
            response.robloxID = request.data.robloxId
        }
        else{
            response.robloxID = null
        }

        //Set roblox username
        if(request.data && request.data.robloxUsername){
            response.robloxUsername = request.data.robloxUsername
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
            errorResponse.error = error.response.data.error ? error.response.data.error : error.response.data
        }
        else if(errorResponse.errorType === 'node'){
            errorResponse.error = error
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

    if(isNaN(discordid)) throw new TypeError('The provided Discord ID must contain valid numbers')
    if(guildid && isNaN(guildid)) throw new TypeError('The provided guild ID must contain valid numbers')

    //Prepare for rowifiError
    let rowifiError = null

    try{
        //Make rowifi request
        const rowifiRequest = await axios.get('https://api.rowifi.link/v1/users/' + discordid + `${guildid ? `?guildid=${guildid}` : ''}`)

        //Check for rowifi errors
        if(rowifiRequest.data && typeof rowifiRequest.data.success !== 'undefined' && rowifiRequest.data.success === false){
            rowifiError = {
                status: rowifiRequest.status,
                data: rowifiRequest.data
            }

            throw new Error('rowifiError')
        }
        
        //Make roblox request
        const robloxRequest = await axios.get(`https://users.roblox.com/v1/users/${rowifiRequest.data.roblox_id}`)

        let response = {
            "status": "success"
        }

        //Set roblox id
        if(robloxRequest.data && robloxRequest.data.id){
            response.robloxID = robloxRequest.data.id
        }
        else{
            response.robloxID = rowifiRequest.data.roblox_id || null
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
        if(rowifiError && rowifiError.status){
            errorResponse.errorCode = rowifiError.status
        }
        else if(error.response && error.response.status){
            errorResponse.errorCode = error.response.status
        }
        else{
            errorResponse.errorCode = null
        }

        //Set error type
        if(rowifiError && rowifiError.data &&  typeof rowifiError.data.success !== 'undefined' && rowifiError.data.success === false){
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
            errorResponse.error = rowifiError.data.message ? rowifiError.data.message : rowifiError.data
        }
        else if(errorResponse.errorType === 'roblox'){
            errorResponse.error = error.response.data.errors[0].message ? error.response.data.errors[0].message : error.response.data.errors[0]
        }
        else if(errorResponse.errorType === 'node'){
            errorResponse.error = error
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