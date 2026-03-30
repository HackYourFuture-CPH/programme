const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

class TeaApi{
    constructor(apiBase){
        this.apiBase = apiBase
    }

    async list(){
        const result = await fetch(`${this.apiBase}/teas`)
        const teas = await result.json()
        return teas
    }

    async get(teaId){

    }
}

class InventoryApi{
    constructor(apiBase){
        this.apiBase = apiBase
    }

    async list(){

    }

    async get(teaId){

    }
}

const teaApi = new TeaApi(API_BASE)
const inventoryApi = new InventoryApi(API_BASE)

console.log(await teaApi.list())

