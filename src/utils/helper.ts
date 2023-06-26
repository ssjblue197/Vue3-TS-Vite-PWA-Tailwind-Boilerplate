import moment from 'moment';
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

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedTime = '';
  if (hours > 0) {
    let tmp = String(hours);
    if (hours < 10) {
      tmp = '0' + tmp;
    }
    formattedTime += tmp + ':';
  }
  if (minutes > 0) {
    let tmp = String(minutes);
    if (minutes < 10) {
      tmp = '0' + tmp;
    }
    formattedTime += minutes + ':';
  }
  let secondStr = String(remainingSeconds);
  if (remainingSeconds < 10) {
    if (hours !== 0 || minutes !== 0) {
      secondStr = '0' + secondStr;
    } else {
      if (remainingSeconds !== 0) {
        secondStr = '0' + secondStr;
      }
    }
  }
  formattedTime += secondStr;

  return formattedTime;
};

export function  formatDateTime(value: string) {
  if (!value) return;
  if (value.includes('T')) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');    
  }
  return value;
}


export const replaceTimeFromNow = (timeNow: string | undefined) =>  {  
  if (!timeNow) return timeNow;
  if (timeNow.includes("few seconds")) {
    timeNow = timeNow.replace("few seconds", "sec");
  }
  if (timeNow.includes("seconds ")) {
    timeNow = timeNow.replace("seconds", "sec");
  }
  if (timeNow.includes("minutes")) {
    timeNow = timeNow.replace("minutes", "min");
  }
  if (timeNow.includes("minute")) {
    timeNow = timeNow.replace("minute", "min");
  }
  if (timeNow.includes("hours")) {
    timeNow = timeNow.replace("hours", "hr");
  }
  if (timeNow.includes("hour")) {
    timeNow = timeNow.replace("hour ", "hr");
  }
  // if (timeNow.includes("days")) {
  //   timeNow = timeNow.replace("days", "d");
  // }
  // if (timeNow.includes("day")) {
  //   timeNow = timeNow.replace("day", "d");
  // }
  // if (timeNow.includes("months")) {
  //   timeNow = timeNow.replace("months", "m");
  // }
  // if (timeNow.includes("month")) {
  //   timeNow = timeNow.replace("month", "m");
  // }
  // if (timeNow.includes("years")) {
  //   timeNow = timeNow.replace("years", "y");
  // }
  // if (timeNow.includes("year")) {
  //   timeNow = timeNow.replace("year", "y");
  // }
  return timeNow;
}

export function timeFromNow(date: string | undefined) {
  if (!date) return;
  return replaceTimeFromNow(moment(date).fromNow(true));
}