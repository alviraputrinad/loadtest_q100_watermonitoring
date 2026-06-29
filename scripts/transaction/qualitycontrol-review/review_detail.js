import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { ENDPOINTS } from "../../config/endpoints.js";
import { AUTH } from "../../config/authentication.js";



export const options = {
  vus: 5,      // Hanya 1 Virtual User
  duration: '10s', // Durasi pengujian 10 detik
  thresholds: {
    http_req_failed: ['rate<0.01'], 
    http_req_duration: ['p(90)<3000'],
  },
};

export function setup() {
  console.log('Running setup: Attempting to obtain authentication token...');

  const loginUrl = ENDPOINTS.LOGIN_URL;  
  const credentials = {
    userName: AUTH.KASIE_UJI_WM,
    password: `P@st3ur${AUTH.KASIE_UJI_WM}*()`,
    applicationCode: "AC-046",
    isForce: true
  };

  const commonHeaders = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Referer': 'https://q100-staging-onprem.biofarma.co.id/', 
    'Origin': 'https://q100-staging-onprem.biofarma.co.id/' 
  };

  const loginRes = http.post(loginUrl, JSON.stringify(credentials), {
    headers: commonHeaders,
    tags: { name: 'Auth_Login_Request_Setup' } 
  });


  check(loginRes, {
    'Setup: Login status is 200': (r) => r.status === 200,
    'Setup: Login response contains token property': (r) => {
        try {
            const body = r.json();
            return body && (body.data[0].accessToken || (body.data && body.data[0].accessToken));
        } catch (e) {
            console.error(`Error parsing login response JSON in setup: ${e}`);
            console.error(`Raw login response body: ${loginRes.body}`);
            return false;
        }
    },
  });

  if (loginRes.status === 200) {
    try {
        const body = loginRes.json();
        let token = null;
        if (Array.isArray(body.data) && body.data.length > 0) {
            token = body.data[0].accessToken;
        }
        if (token) {
            console.log('Authentication token obtained successfully in setup.');
            return { token: token, commonHeaders: commonHeaders }; 
        } else {
            console.error(`Login successful (200) but 'accessToken' property not found in data[0]. Body: ${JSON.stringify(body)}`);
            throw new Error('Could not extract accessToken from login response in setup.');
        }
    } catch (e) {
        console.error(`Failed to parse login response or extract accessToken in setup: ${e}. Raw body: ${loginRes.body}`);
        throw new Error('Failed to process login response in setup.');
    }
  } else {
    console.error(`Failed to obtain token in setup. Status: ${loginRes.status}, Body: ${loginRes.body}`);
    throw new Error('Authentication failed in setup. Test aborted.');
  }
}


export default function (data) {
  if (!data || !data.token || !data.commonHeaders) {
    console.error(`[VU ${__VU}]: No token or common headers available from setup. Skipping request.`);
    sleep(1);
    return;
  }
  const apiHeaders = {
    ...data.commonHeaders, 
    Authorization: `Bearer ${data.token}`,
  };

  const REVIEW_DETAIL_API_2_res = http.get(ENDPOINTS.REVIEW_DETAIL_API_2, {
    headers: apiHeaders, 
    tags: { name: 'REVIEW_DETAIL_API_2' } 
  });

  check(REVIEW_DETAIL_API_2_res, {
    'REVIEW_DETAIL_API_2: status is 200': (r) => r.status === 200,
  });

  if (REVIEW_DETAIL_API_2_res.status !== 200) {
      console.error(`[VU ${__VU}]: REVIEW_DETAIL_API_2 failed with status ${REVIEW_DETAIL_API_2_res.status}. Body: ${REVIEW_DETAIL_API_2_res.body}`);
  }

}
export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
  };
}