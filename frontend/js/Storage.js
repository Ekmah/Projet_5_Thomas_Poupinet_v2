class StorageClass{
    constructor(){
        this.engine = localStorage;
    }

    has(id){
        return !! this.engine.getItem(id);
    }

    get(id){
        if(!this.has(id)){
            return null;
        };
        return JSON.parse(this.engine.getItem(id));
    }

    store(id, value){
        this.engine.setItem(id, JSON.stringify(value));
    }
    
    clear(id){
        this.engine.clear();
    }
}
let Storage = new StorageClass();