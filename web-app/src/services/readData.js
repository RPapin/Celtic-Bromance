const baseURL = 'https://celtic-bromance-url.herokuapp.com/' //https://api-suivibourse.herokuapp.com/

export default class ReadData {

    async getTunnelUrl() {
        const fecthedData = await fetch(baseURL + 'get_url')
        .then(res => {
            return res.json()
        })
        .then((data) => {
            console.log(data.error)
            if (data.error) return data.error
            else return data.url
        })
        return fecthedData
    }
    async callLocalApi(parameter) {
        const url = await this.getTunnelUrl()
        if(url !== "no url found"){
            const fecthedData = await fetch(url + parameter)
            .then(res => {
                return res.json()
            })
            .then((data) => {
                return data
            })
            return fecthedData
        } else return false
    }
}