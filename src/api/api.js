import RestaurantUrls from '../constants/appSettings';

const urlApi = RestaurantUrls.setEnvironment(process.env.NODE_ENV);

export function getRestaurantsApi () {
  const url = urlApi.fullList;

  // return new Promise(function (resolve, reject) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(Error(response.status));
      }
    })
    .then(data => {
      return Promise.resolve(data);
    })
    .catch(err => {
      return Promise.reject(Error('Network Error: ' + err));
    });

    // Do the usual XHR stuff
    // let req = new XMLHttpRequest()
    // req.open('GET', url)

    // req.onload = function () {
    //   // This is called even on 404 etc
    //   // so check the status
    //   if (req.status == 200) {
    //     // Resolve the promise with the response text
    //     resolve(JSON.parse(req.response))
    //   }else {
    //     // Otherwise reject with the status text
    //     // which will hopefully be a meaningful error
    //     reject(Error(req.statusText))
    //   }
    // }

    // // Handle network errors
    // req.onerror = function () {
    //   reject(Error('Network Error'))
    // }

// // Make the request
// req.send()
// })
}

export function getBusinessApi (id) {
  const url = urlApi.business + id;

  // return new Promise(function (resolve, reject) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(Error(response.status));
      }
    })
    .then(data => {
      return Promise.resolve(data);
    })
    .catch((err) => {
      return Promise.reject(Error('Network Error: ' + err));
    });
    // Do the usual XHR stuff
    //   let req = new XMLHttpRequest()
    //   req.open('GET', url)

    //   req.onload = function () {
    //     // This is called even on 404 etc
    //     // so check the status
    //     if (req.status == 200) {
    //       // Resolve the promise with the response text
    //       resolve(JSON.parse(req.response))
    //     }else {
    //       // Otherwise reject with the status text
    //       // which will hopefully be a meaningful error
    //       reject(Error(req.statusText))
    //     }
    //   }

    //   // Handle network errors
    //   req.onerror = function () {
    //     reject(Error('Network Error'))
    //   }

//   // Make the request
//   req.send()
// })
// .catch( e =>{Error(e.statusText);})
};

export function getInspectionsApi (id) {
  const url = urlApi.inspections + id;

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(Error(response.status));
      }
    })
    .then(data => {
      return Promise.resolve(data);
    })
    .catch(err => {
      return Promise.reject(Error('Network Error: ' + err));
    });

  // return new Promise(function (resolve, reject) {
  //   // Do the usual XHR stuff
  //   let req = new XMLHttpRequest();
  //   req.open('GET', url);

  //   req.onload = function () {
  //     // This is called even on 404 etc
  //     // so check the status
  //     if (req.status == 200) {
  //       // Resolve the promise with the response text
  //       resolve(JSON.parse(req.response));
  //     }else {
  //       // Otherwise reject with the status text
  //       // which will hopefully be a meaningful error
  //       reject(Error(req.statusText));
  //     }
  //   };

  //   // Handle network errors
  //   req.onerror = function () {
  //     reject(Error('Network Error'));
  //   };

  //   // Make the request
  //   req.send();
  // });
};
