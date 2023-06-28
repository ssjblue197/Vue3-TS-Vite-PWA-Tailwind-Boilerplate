// import moment from 'moment';
import moment from 'moment-timezone'
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
    return (value.split('.')[0]).replace('T', ' ');    
  }
  return value;
}


export function timeFromNow(date: string | undefined) {
  if (!date) return;
  const startStr = (date.split('.')[0]).replace('T', ' ')
  const endStr = moment().tz("America/Los_Angeles").format('YYYY-MM-DD HH:mm:ss');

  const timeEnd = moment(endStr, 'YYYY-MM-DD HH:mm:ss');
  const timeStart = moment(startStr, 'YYYY-MM-DD HH:mm');
  const diffSeconds = timeEnd.diff(timeStart, 'seconds');
  if (diffSeconds >= 86400) {
    return String(Math.floor(diffSeconds/(86400))) + ' days'
  }
  if (diffSeconds >= 3600 && diffSeconds < 86400) {
    return String(Math.floor(diffSeconds/3600)) + ' hours'
  }
  if (diffSeconds > 60 && diffSeconds < 3600) {
    return String(Math.floor(diffSeconds/60)) + ' minutes'
  }
  if (diffSeconds < 60) {
    return String(Math.floor(diffSeconds)) + ' seconds'
  }
}

export function dateStringToSeconds(dateString: string, format: string) {
  const dateObj = moment(dateString, format);
  const milliseconds = dateObj.valueOf();
  const seconds = Math.floor(milliseconds / 1000);
  return seconds;
}

export function checkPickupTimeOut(expired?: string) {
  if (!expired) return {
    valid: false,
    range: 0
  }

  const timeNow = moment().tz("America/Los_Angeles").format('YYYY-MM-DD HH:mm:ss');
  const endTimeSec = dateStringToSeconds(expired, 'YYYY-MM-DD hh:mm:ss'); 
  const timeNowSec = dateStringToSeconds(timeNow, 'YYYY-MM-DD hh:mm:ss'); 

  if (timeNowSec > endTimeSec) {
    return {
      valid: false,
      range: 0
    }
  } else {
    return {
      valid: true,
      range: endTimeSec - timeNowSec
    }
  }
}

export function getErrorMessage(error: any) {
  if (error?.response?.data?.errors)  {
    const errorValues = Object.values(error?.response?.data?.errors);
    if (errorValues.length > 0) {
      return errorValues.join(' ');
    }
  }
  return error?.response?.data?.message;
} 