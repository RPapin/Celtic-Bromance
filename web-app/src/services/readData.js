const baseURL = 'http://localhost:5000/' //https://api-suivibourse.herokuapp.com/
export default class ReadData {
    constructor(){
    }
    
    async startChampionnship() {
        const fecthedData = await fetch(baseURL + 'start_championnship')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            return data
        })
        return fecthedData
    }
    async seeResult() {
        const fecthedData = await fetch(baseURL + 'display_result')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            return data
        })
        return fecthedData
    }
    async launchServer() {
        const fecthedData = await fetch(baseURL + 'launch_server')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            return data
        })
        return fecthedData
    }
    
}