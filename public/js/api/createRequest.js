
/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    let url = options.url;
    let headers = options.headers;
    let data = options.data;
    let responseType = options.responseType;
    let method = options.method;
    let callback = options.callback;

    let xhr = new XMLHttpRequest();

    xhr.responseType = responseType;
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
        //   let response = xhr.response;
          callback(null, xhr.response);
          } else if (xhr.readyState == 4 && xhr.status != 200) {
             let err = xhr.status;
           callback(err, null);
    } 
}) 

    if (method == "GET" && data) {
        
        let formData = "";
        for (let key in data) {
            formData +=  `${key}=${data[key]}&`
        }
        
        xhr.open(method, url + "?" + formData.slice(0, -1));
        xhr.send();
    } else if (method == "GET") { 
        xhr.open("GET", url);
        xhr.send();
    } else {
        let formData = new FormData;
        for (let key in data) {
            formData.append(key, data[key]);
        }
        xhr.open(`${method}`, `${url}`);
        xhr.send(formData);
    }
}; 


