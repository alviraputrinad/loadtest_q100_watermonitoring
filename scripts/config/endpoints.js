var BASE_URL = 'https://q100-api-staging-onprem.biofarma.co.id'
export const ENDPOINTS = {
    LOGIN_URL : `${BASE_URL}/auam/v1/Auth/Login`,
    
    SCHEDULE_LIST_API_1 : `${BASE_URL}/qcs-water-monitoring/v1/Schedule/List?search=&limit=10&page=1&objectStatus=1,2,3,4&month=&year=&organizationId=239&startDate=&endDate=&startScheduleDate=&endScheduleDate=`,
    SCHEDULE_DETAIL_API_2 : `${BASE_URL}/qcs-water-monitoring/v1/Schedule/GetDetailById?id=557`,
    SCHEDULE_DETAIL_API_3 : `${BASE_URL}/qcs-water-monitoring/v1/ScheduleCalendar/GetSummaryDateByScheduleId?id=557`,
    SCHEDULE_DETAIL_API_4 : `${BASE_URL}/qcs-water-monitoring/v1/Schedule/GetWorkFlowHistory?id=557`,
    
    SAMPLING_LIST_API_1 : `${BASE_URL}/qcs-water-monitoring/v1/Sampling/List?limit=10&page=1&objectStatus=2&schedule=2026-06-01&startDate=2026-06-29&endDate=2026-06-29`,
    SAMPLING_DETAIL_API_2 : `${BASE_URL}/qcs-water-monitoring/v1/Sampling/GetDetailById?id=4d1bd37e-f3b6-4c34-9767-714bb1d8b425&batchNumber=`,

    TRANSFER_LIST_API_1 : `${BASE_URL}/qcs-water-monitoring/v1/Transfer/List?limit=10&page=1&objectStatus=1%2C2%2C3%2C4&roleQC=OP_SMPLG_WM`,
    TRANSFER_DETAIL_API_2 : `${BASE_URL}/qcs-water-monitoring/v1/Transfer/GetDetailById?id=02727e98-1dbb-4ebb-b4d0-38066a024594`,

    TESTING_LIST_API_1 : `${BASE_URL}/qcs-water-monitoring/v1/Testing?search=&limit=10&page=1&statuses=1%2C2%2C3%2C4%2C5%2C6%2C7&startDate=2026-01-01&endDate=2026-06-29&method=Endotoksin&waterType=WFI%2CPS%2CPTW%2CPW%2CRW`,
    TESTING_DETAIL_API_2 : `${BASE_URL}/qcs-water-monitoring/v1/Testing/763`,

    IDENT_LIST_API_1 : `${BASE_URL}/qcs-water-monitoring/v1/UjiIdent/List?status=2&limit=10&page=1&dateFrom=2024-01-01&dateTo=2026-06-29`,
    IDENT_LIST_API_2 : `${BASE_URL}/v1/UjiIdent/BatchList`,

    REVIEW_LIST_API_1 : `${BASE_URL}/qcs-water-monitoring/v1/Testing/approval?search=&limit=10&page=1&statuses=3%2C2%2C1%2C4%2C5%2C6%2C7&startDate=2026-01-01&endDate=2026-06-29&method=Endotoksin&waterType=WFI%2CPS%2CPTW%2CPW%2CRW`,
    REVIEW_DETAIL_API_2 : `${BASE_URL}/qcs-water-monitoring/v1/Testing/738`,

    TODO_SCHDL_LIST_API1 : `${BASE_URL}/qcs-water-monitoring/v1/Schedule/List?search=&limit=10&page=1&objectStatus=2,3,4&month=&year=&organizationId=&startDate=&endDate=&startScheduleDate=&endScheduleDate=`,

    DEVIATION_LIST_API_1 : `${BASE_URL}/qcs-water-monitoring/v1/Deviation/List?ListWaterType=1,2,3,4`,
    DEVIATION_DETAIL_API_1 : `${BASE_URL}/qcs-water-monitoring/v1/Deviation/GetDetailById?id=b8923223-f45a-4dfe-95cb-d205ab52bd19`,
    
    DSBD_LIVE_TRENDING_API1 : `${BASE_URL}/qcs-water-monitoring/v1/DashboardLiveTranding/Get?StartDate=2026-01-01T00%3A00%3A00%2B07%3A00&EndDate=2026-12-31T23%3A59%3A59%2B07%3A00&WTPId=45&Purpose=QualificationPhase1&TestTypeId=285&LoopId=304&UsePointId=767`,
    DSBD_OVERVIEW_API1 : `${BASE_URL}/qcs-water-monitoring/v1/Dashboard?startMonth=1&endMonth=12&startYear=2026&endYear=2026&wtp=WTP-GD-36`
    

};
