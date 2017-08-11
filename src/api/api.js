import RestaurantUrls from '../constants/appSettings';

const urlApi = RestaurantUrls.setEnvironment(process.env.NODE_ENV);

export function getRestaurantsApi () {
  return fetch(urlApi.fullList)
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
}

export function getBusinessApi (id) {
  return fetch(urlApi.business + id)
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
}

export function getInspectionsApi (id) {
  return fetch(urlApi.inspections + id)
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
}
export function getRestaurantsByNameApi (name) {
  return fetch(urlApi.searchName + name)
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
}
export function getRestaurantsByCityApi (city) {
  return fetch(urlApi.searchCity + city)
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
}
export function getRestaurantsByZipApi (zip) {
  return fetch(urlApi.searchZip+ zip)
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
}
