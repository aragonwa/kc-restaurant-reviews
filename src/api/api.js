import RestaurantUrls, { PAGER_ITEMS_PER_PAGE as itemsPerPage } from '../constants/appSettings';

const urlApi = RestaurantUrls.setEnvironment(process.env.NODE_ENV);

export function getRestaurantsApi (type, ratingFilter = 0 , pageNumber = 0 , val = '') {
  let url = '';
  switch (type) {
    case 'all': {
      url = urlApi.fullList;
      break;
    }
    case 'business': {
      url = urlApi.business + val;
      break;
    }
    case 'inspections': {
      url = urlApi.inspections + val;
      break;
    }
    case 'name': {
      url = urlApi.searchName;
      break;
    }
    case 'city': {
      url = urlApi.searchCity;
      break;
    }
    case 'zip': {
      url = urlApi.searchZip;
      break;
    }
  }

  if (type === 'business' || type === 'inspections') {
    return fetch(`${url}`)
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

  return fetch(`${url}${ratingFilter}/${pageNumber}/${itemsPerPage}/${val}`)
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
