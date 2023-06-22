
export function queryStringToObject(queryString: string) {
  var pairs = queryString.split('&');
  var result: any = {};

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1] || '');
    result[key] = value;
  }

  return result;
}

export function objectToQueryString(obj: any) {
  const params = new URLSearchParams();

  // Iterate over each key-value pair in the object
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Add each key-value pair to the URLSearchParams object
      params.append(key, obj[key]);
    }
  }

  // Return the query string
  return params.toString();
}

export function formatNum(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
