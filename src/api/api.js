export function getRestaurantsApi () {
  let url = '//kcit-bzzqfx1:40001/api/business/a/47.0845/-122.5284/47.7803/-121.0657';
  // let url = 'https://api.github.com/users/defunkt';

  return new Promise(function (resolve, reject) {
    // Do the usual XHR stuff
    let req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function () {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function () {
      reject(Error('Network Error'));
    };

    // Make the request
    req.send();
  });
}
