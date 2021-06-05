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
            console.log(data)
            return data
        })
        return fecthedData
    }
}