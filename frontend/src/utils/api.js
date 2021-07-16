class Api{
    constructor(options ){
        this._options = options;
        this._baseUrl = options.baseUrl;
        this._headers = {headers: options.headers};
        this._headersGet ={
            method: 'GET',
            headers: options.headers
        };
        this._headersPatch ={
            method: 'PATCH',
            headers: options.headers
        };
        this._headersPost ={
            method: 'POST',
            headers: options.headers
        };
        this._headersPut ={
            method: 'PUT',
            headers: options.headers
        };
        this._headersDelete ={
            method: 'DELETE',
            headers: options.headers
        };
    }

    getFetch(){
        return fetch(this._baseUrl + "/users/me", this._headersGet)
            .then(res => res.json());
    }

    getInitialCards(){
        return fetch(this._baseUrl + "/cards", this._headersGet)
            .then(res => {
                if (res.ok) {
                return res.json();
                }
        
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    getFetchPatch(st, body){
        this._headersPatch.body = body;
        return fetch(this._baseUrl + st, this._headersPatch)
            .then(res => res.json());
    }

    getFetchPost(st, body){
        this._headersPost.body = body;
        return fetch(this._baseUrl + st, this._headersPost)
            .then(res => res.json());
    }

    getFetchPut(st){
        return fetch(this._baseUrl + st, this._headersPut)
            .then(res => res.json());
    }

    getFetchDelete(st){
        return fetch(this._baseUrl + st, this._headersDelete)
            .then(res => {
                if (res.ok) {
                return res.json();
                }
        
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    changeLikeCardStatus(cardId, isLiked){
        //console.log(isLiked);
        if(isLiked){
            return this.getFetchPut('/cards/likes/' + cardId);
        }
        //console.log("Del");
        return this.getFetchDelete('/cards/likes/' + cardId);
    }
}

const apiUser = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
      authorization: 'e5d9a431-fbb1-4062-9884-1c501cbe22b4',
      'Content-Type': 'application/json'
    }
  })

  export default apiUser;
