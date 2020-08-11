export const  API_ENDPOINT = "https://api.swychover.io/qa";
export const DUMMY_PHONE = "4698101398";
export const DUMMY_EMAIL = "knuprotest@gmail.com";
export const APP_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const APP_API_KEY = process.env.REACT_APP_API_KEY;
const APP_ID_BACKEND_MAP = {
  "ca": 2019112169356173,
  "us": 2019112169356169
};
export const APP_ID_BACKEND = APP_ID_BACKEND_MAP[process.env.REACT_APP_ID_COUNTRY];
export const REPEATED_API_CALL_TIME_INTERVAL = 500;
export const API_CALL_TIMEOUT= 45000;
export const DEFAULT_ERROR_MESSAGE = "Something went wrong.Please try again.";
export const ERROR_TIMEOUT = "10000";
export const CONTENT_TYPE = "application/x-www-form-urlencoded";
export const MOCK_API_ENDPOINT = "https://24197bd9-5971-4377-865a-c5bb3c79e02b.mock.pstmn.io/api/v1";
export const SESSION_EXPIRY_ERROR_CODE = 20000002;
export const ONLY_NUMBER_PATTERN = /^\d+$/;
export const FIRST_CHAR_QUESTION_MARK = /^\?.*/;
export const SWYCH_CATALOG_PAGE = "/swych";
export const APP_CLIENT_ID_BYPASS = "swych_b2b_test";
export const APP_API_KEY__BYPASS = "swych_b2b_test";
export const WARNING_ERROR_MESSAGE = "Please make sure that popups are not blocked from your browser settings.";
export const VARIABLE_DENOMINATION_TYPE_IS_RANGE = "1";
export const STATE = "state";
export const AUTH_CODE = "auth_code";
export const PURCHASE_TYPE_SELF = 2;
export const APP_COUNTRY_US= "us";
export const APP_COUNTRY_CA = "ca";
export const ALIPAY_SYSTEM_PREDEFINED_PAYEMENT_TYPE= 17;
export const PROMOTIONAL_PAYMENT_TYPE = 12;
export const SESSION_TOKEN = `alipay_purchase_portal_${process.env.REACT_APP_ID_COUNTRY}_session_token`;
export const STORE_KEY = `alipay_yoyogo_purchase_portal_${process.env.REACT_APP_ID_COUNTRY}`;
export const BROWSER_PAGE_RELOAD_NAVIGATION_TYPE = 1;
export const AVALIABLE_LNG = ["en", "es", "chn"];
export const IS_AUTHENTICATING = "isAuthenticating";
export const ENV_URL_MAP = {
  "dev": {
    "ca": 
    {
      URL:"https://localhost:3000/#/",
      REACT_APP_CLIENT_ID: "swych_yoyogo_ca",
      REACT_APP_API_KEY:"swych_yoyogo_ca",
      WEBSOCKETSERVER:"wss://api.appcaps.com/swychapp-b2b/ws"
    },
    "us": {
      URL:"https://localhost:3000/#/",
      REACT_APP_CLIENT_ID: "swych_b2b_yoyogo",
      REACT_APP_API_KEY:"swych_b2b_yoyogo",
      WEBSOCKETSERVER:"wss://api.appcaps.com/swychapp-b2b/ws"
    }
  },
  "qa": {
    "ca": 
    {
      URL:"https://alipay-qa.swychover.io/ca/#/",
      REACT_APP_CLIENT_ID: "swych_yoyogo_ca",
      REACT_APP_API_KEY:"swych_yoyogo_ca",
      WEBSOCKETSERVER:"wss://b2bwebapp0412.azurewebsites.net/ws"
    },
    "us": {
      URL:"https://alipay-qa.swychover.io/us/#/",
      REACT_APP_CLIENT_ID: "swych_b2b_yoyogo",
      REACT_APP_API_KEY:"swych_b2b_yoyogo",
      WEBSOCKETSERVER:"wss://b2bwebapp0412.azurewebsites.net/ws"
    }
  },
  "sandbox": {
    "ca": 
    {
      URL:"https://alipay-pre-prod.swychover.io/ca/#/",
      REACT_APP_CLIENT_ID: "swych_yoyogo_ca",
      REACT_APP_API_KEY:"swych_yoyogo_ca",
      WEBSOCKETSERVER:"wss://b2bwebapp0412.azurewebsites.net/ws"
    },
    "us": {
      URL:"https://alipay-pre-prod.swychover.io/us/#/",
      REACT_APP_CLIENT_ID: "swych_b2b_yoyogo",
      REACT_APP_API_KEY:"swych_b2b_yoyogo",
      WEBSOCKETSERVER:"wss://b2bwebapp0412.azurewebsites.net/ws"
    }
  },
  "preprod": {
    "ca": 
    {
      URL:"https://alipay-pre-prod.swychover.io/ca/#/",
      REACT_APP_CLIENT_ID: "swych_yoyogo_ca",
      REACT_APP_API_KEY:"dcef3bc4f481b6b5e5837d6cf4eecc62",
      WEBSOCKETSERVER:"wss://swychb2bpreprod.azurewebsites.net/ws"
    },
    "us": {
      URL:"https://alipay-pre-prod.swychover.io/us/#/",
      REACT_APP_CLIENT_ID: "",
      REACT_APP_API_KEY:"",
      WEBSOCKETSERVER:"wss://swychb2bpreprod.azurewebsites.net/ws"
    }
  },
  "prod": {
    "ca": 
    {
      URL:"https://alipay.swychover.io/ca/#/",
      REACT_APP_CLIENT_ID: "swych_alipay_ca",
      REACT_APP_API_KEY:"9ac30b7u78e0d34bab6ce09b88f96sg3",
      WEBSOCKETSERVER:"wss://swychb2bprod.azurewebsites.net/ws"
    },
    "us": {
      URL:"https://alipay.swychover.io/us/#/",
      REACT_APP_CLIENT_ID: "",
      REACT_APP_API_KEY:"",
      WEBSOCKETSERVER:"wss://swychb2bprod.azurewebsites.net/ws"
    }
  }
};
