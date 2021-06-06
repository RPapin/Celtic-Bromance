const baseURL = 'http://localhost:5000/' //https://api-suivibourse.herokuapp.com/
export default class ReadData {
    constructor(){
    }
    
    async startChampionnship() {
        const fecthedData = await fetch(baseURL + 'start_championnship')
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then((data) => {
            return data
        })
        return fecthedData
    }
    async seeResult() {
        console.log("call to seeResult")
        const fecthedData = await fetch(baseURL + 'display_result')
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then((data) => {
            return data
        })
        return fecthedData
    }
    async launchServer() {
        console.log("call to launchServer")
        const fecthedData = await fetch(baseURL + 'launch_server')
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then((data) => {
            return data
        })
        return fecthedData
    }
    
}