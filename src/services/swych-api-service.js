import { CONTENT_TYPE, API_ENDPOINT, APP_API_KEY, APP_CLIENT_ID, SESSION_TOKEN, SESSION_EXPIRY_ERROR_CODE, APP_COUNTRY_US, APP_COUNTRY_CA } from '../App.config';
import request from '../../src/utilities/apiService';
import { history } from '../history';
import { ENV_URL_MAP } from "../App.config";



function getCommonHeaderDetails(data) {
  const _APP_API_KEY = localStorage.getItem('apiKey')
  const _APP_CLIENT_ID = localStorage.getItem('clientId')


  return Object.assign({}, data || {}, {
    apiKey: _APP_API_KEY,
    clientId: _APP_CLIENT_ID,
    "Content-Type": CONTENT_TYPE
  });
}

function login(data) {
  let headerData = {
    "Content-Type": CONTENT_TYPE
  }

  return request(
    API_ENDPOINT + '/oauth2/token',
    'post',
    headerData,
    data
  ).then(response => {
    return response.data;
  }).catch(error => {
    console.warn('error ' + JSON.stringify(error))
    throw (error)
  })
}

function emailLogin(data){
  let headerData = {
    "Content-Type": CONTENT_TYPE
  }

  return request(
    API_ENDPOINT + '/auth/pwd',
    'post',
    headerData,
    data
  ).then(response => {
    return response.data;
  }).catch(error => {
    throw (error)
  })
}

function getCategory() {
  let headerDate = {
    "Content-Type": CONTENT_TYPE,
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    clientId: localStorage.getItem('clientId'),
    apiKey: localStorage.getItem('apiKey')
  }
  return request(
    API_ENDPOINT + `/api/v1/b2b/${localStorage.getItem('accountId')}/catalog?pageNo=1&pageSize=100`,
    'get',
    headerDate,
  ).then(response => {
    return response.data;
  }).catch(error => {
    throw (error);
  })
}

function getHistory(data) {
  let headerData =
  {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    clientId: localStorage.getItem('clientId'),
    apiKey: localStorage.getItem('apiKey')
  }
  return request(
    API_ENDPOINT + data,
    'get',
    headerData,
  ).then(response => {
    return response.data;
  }).catch(error => {
    throw (error);
  })
}

function getOrderId(data) {
  let headerData = {
    "Content-Type": "application/json",
    clientId: localStorage.getItem('clientId'),
    apiKey: localStorage.getItem('apiKey'),
    device_id: "141832cd24409210",
    latitude: "44.058004",
    longitude: "-79.428536",
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
  return request(
    API_ENDPOINT + '/api/v1/b2b/order',
    'put',
    headerData,
    data
  ).then(response => {
    return response.data;
  }).catch(error => {
    throw (error)
  })
}

function getOrderInfos(data) {
  let headerData = {
    "Content-Type": "application/json",
    clientId: localStorage.getItem('clientId'),
    apiKey: localStorage.getItem('apiKey'),
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }

  return request(
    API_ENDPOINT + '/api/v1/b2b/order',
    'post',
    headerData,
    data
  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw (error)
    })
}

function getBalance(data) {
  let headerData = {
    clientId: localStorage.getItem('clientId'),
    apiKey: localStorage.getItem('apiKey'),
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }

  return request(
    API_ENDPOINT + `/api/v1/b2b/${localStorage.getItem('accountId')}/balance`,
    'get',
    headerData,

  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw (error)
    })


}

function queryUnfinishedTransaction(swychId) {
  let headerData = {
    swychId: swychId
  }
  return request(
    API_ENDPOINT + '/b2c/transactions/status',
    'get',
    getCommonHeaderDetails(headerData),
  ).then(response => {
    checkInvalidSession(response);
    return response.data;
  }).catch(error => {
    checkInvalidSession(error);
    throw (error);
  })
}


function checkInvalidSession(result) {
  //TODO : Need to update SESSION_EXPIRY_ERROR_CODE as per the backend response
  if (result && result.data && result.data.statusCode == SESSION_EXPIRY_ERROR_CODE) {
    localStorage.clear();
    history.push("/catalog");
  }
}

function setIsAuthennticating(boolean) {
  localStorage.setItem('isAuthenticating', boolean);
}

function getSessionToken() {
  return localStorage.getItem(SESSION_TOKEN);
}

function setSessionToken(token) {
  localStorage.setItem(SESSION_TOKEN, token);
}

function getIsAuthennticating() {
  return localStorage.getItem('isAuthenticating');
}

function checkPromoCode(data) {
  const headerData = {
    'sessionToken': getSessionToken()
  };
  return request(
    API_ENDPOINT + '/b2c/promotions/validate',
    'post',
    getCommonHeaderDetails(headerData),
    data
  )
    .then(response => {
      checkInvalidSession(response);
      return response.data;
    })
    .catch(error => {
      checkInvalidSession(error);
      throw (error);
    });
}

function validateTransaction(data) {
  const headerData = {
    'sessionToken': getSessionToken()
  };
  return request(
    API_ENDPOINT + '/b2c/transactions/validate',
    'post',
    getCommonHeaderDetails(headerData),
    data
  )
    .then(response => {
      checkInvalidSession(response);
      return response.data;
    })
    .catch(error => {
      checkInvalidSession(error);
      throw (error);
    });
}

function issueGiftCard(data, orderId) {
  const headerData = {
    'sessionToken': getSessionToken()
  };
  data.orderId = orderId;
  return request(
    API_ENDPOINT + '/b2c/transactions/purchase',
    'post',
    getCommonHeaderDetails(headerData),
    data
  )
    .then(response => {
      checkInvalidSession(response);
      return response.data;
    })
    .catch(error => {
      checkInvalidSession(error);
      throw (error);
    });
}
function validatePayment(orderId, amount, currency) {
  const headerData = {
    'sessionToken': getSessionToken()
  };
  return request(
    API_ENDPOINT + '/b2c/payments/validate' + '?amount=' + amount + '&currency=' + currency + '&orderId=' + orderId,
    'get',
    getCommonHeaderDetails(headerData),

  ).then(response => {
    checkInvalidSession(response);
    return response.data;
  })
    .catch(error => {
      checkInvalidSession(error);
      throw (error);
    });
}

function queryTransactionbyOrder(orderId) {
  const headerData = {
    'sessionToken': getSessionToken()
  };
  return request(
    API_ENDPOINT + '/b2c/transactions/status/' + orderId,
    'get',
    getCommonHeaderDetails(headerData),
  ).then(response => {
    checkInvalidSession(response);
    return response.data;
  })
    .catch(error => {
      checkInvalidSession(error);
      throw (error);
    });
}

function trackPaymentStatus(orderId) {
  const headerData = {
    'sessionToken': getSessionToken()
  };
  return request(
    API_ENDPOINT + '/b2c/payments/status' + '?orderId=' + orderId,
    'get',
    getCommonHeaderDetails(headerData),
  ).then(response => {
    checkInvalidSession(response);
    return response.data;
  })
    .catch(error => {
      checkInvalidSession(error);
      throw (error);
    });
}

function customerSupport(orderId) {
  const headerData = {
    'sessionToken': getSessionToken()
  };
  const data = {
    "orderId": orderId
  }
  return request(
    API_ENDPOINT + '/b2c/support',
    'post',
    getCommonHeaderDetails(headerData),
    data

  ).then(response => {
    checkInvalidSession(response);
    return response.data;
  })
    .catch(error => {
      checkInvalidSession(error);
      throw (error);
    });
}

function alipassStatus(orderId) {
  const headerData = {
    'sessionToken': getSessionToken()
  };
  return request(
    API_ENDPOINT + '/b2c/AliPass/status' + '?orderId=' + orderId,
    'get',
    getCommonHeaderDetails(headerData),

  ).then(response => {
    checkInvalidSession(response);
    return response.data;
  })
    .catch(error => {
      checkInvalidSession(error);
      throw (error);
    });
}

function cancelPayment(orderId) {
  const headerData = {
    'sessionToken': getSessionToken()
  };
  const data = {
    "orderId": orderId
  }
  return request(
    API_ENDPOINT + '/b2c/payments/cancel',
    'post',
    getCommonHeaderDetails(headerData),
    data
  )
    .then(response => {
      checkInvalidSession(response);
      return response.data;
    })
    .catch(error => {
      checkInvalidSession(error);
      throw (error);
    });
}
function fetchCatalog() {

  return request(
    API_ENDPOINT + '/b2c/giftcards',
    'get',
    getCommonHeaderDetails()
  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw (error);
    });
}

function getAuthCode() {
  return request(

  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw (error);
    });
}


function registerUser(data) {
  return request(
    API_ENDPOINT + '/b2c/users',
    'put',
    getCommonHeaderDetails(),
    data
  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw (error);
    });
}

function getPromoByToken(token, brandId, sessionToken) {
  const headerData = {
    'sessionToken': sessionToken
  };
  let queryString = "";
  if (token && process.env.REACT_APP_ID_COUNTRY == APP_COUNTRY_US) {
    queryString = '?token=' + token;
  }
  else if (brandId && process.env.REACT_APP_ID_COUNTRY == APP_COUNTRY_CA) {
    queryString = '?brandId=' + brandId;
  }
  return request(
    API_ENDPOINT + '/b2c/promotions' + queryString,
    'get',
    getCommonHeaderDetails(headerData)
  )
    .then(response => {
      // checkInvalidSession(response);
      return response.data;
    })
    .catch(error => {
      // checkInvalidSession(error);
      throw (error);
    });
}

const swychApiService = {
  fetchCatalog,
  login,
  getAuthCode,
  registerUser,
  checkPromoCode,
  getPromoByToken,
  validateTransaction,
  setSessionToken,
  getSessionToken,
  validatePayment,
  trackPaymentStatus,
  issueGiftCard,
  cancelPayment,
  alipassStatus,
  queryUnfinishedTransaction,
  customerSupport,
  queryTransactionbyOrder,
  getIsAuthennticating,
  setIsAuthennticating,
  getCategory,
  getOrderId,
  getOrderInfos,
  getBalance,
  getHistory,
  emailLogin
};


export default swychApiService;
