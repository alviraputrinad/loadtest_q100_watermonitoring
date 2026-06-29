import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { ENDPOINTS } from "../../config/endpoints.js";

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
    userName: "1689",
    password: "P@st3ur1689*()",
    applicationCode: "AC-046",
    isForce: true
  };

  const commonHeaders = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Referer': 'https://q100-staging.biofarma.co.id/', 
    'Origin': 'https://q100-staging.biofarma.co.id/' 
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

  const ScheduleDetail_API1 = 'https://q100-api-testing-onprem.biofarma.co.id/qcs-water-monitoring/v1/Schedule/GetDetailById?id=557';
  const ScheduleDetail_API1_res = http.get(ScheduleDetail_API1, {
    headers: apiHeaders, 
    tags: { name: 'ScheduleDetail_API1' } 
  });

  check(ScheduleDetail_API1_res, {
    'ScheduleDetail_API1: status is 200': (r) => r.status === 200,
  });

  if (ScheduleDetail_API1_res.status !== 200) {
      console.error(`[VU ${__VU}]: ScheduleDetail_API1 failed with status ${ScheduleDetail_API1.res.status}. Body: ${ScheduleDetail_API1.res.body}`);
  }

  const ScheduleList_API2 = 'https://q100-api-testing-onprem.biofarma.co.id/qcs-water-monitoring/v1/ScheduleCalendar/GetSummaryDateByScheduleId?id=557';
  const ScheduleList_API2_res = http.get(ScheduleList_API2, {
    headers: apiHeaders, 
    tags: { name: 'ScheduleList_API2' } 
  });

  check(ScheduleList_API2_res, {
    'ScheduleList_API1: status is 200': (r) => r.status === 200,
  });

  if (ScheduleList_API2_res.status !== 200) {
      console.error(`[VU ${__VU}]: ScheduleList_API1 failed with status ${ScheduleList_API2_res.status}. Body: ${ScheduleList_API2_res.body}`);
  }

 sleep(1);
   const ScheduleList_API3 = 'https://q100-api-testing-onprem.biofarma.co.id/qcs-water-monitoring/v1/Schedule/GetWorkFlowHistory?id=557';
  const ScheduleList_API3_res = http.get(ScheduleList_API3, {
    headers: apiHeaders, 
    tags: { name: 'ScheduleList_API3' } 
  });

  check(ScheduleList_API3_res, {
    'ScheduleList_API3: status is 200': (r) => r.status === 200,
  });

  if (ScheduleList_API3_res.status !== 200) {
      console.error(`[VU ${__VU}]: ScheduleList_API3 failed with status ${ScheduleList_API3_res.status}. Body: ${ScheduleList_API3_res.body}`);
  }

}
export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
  };
}