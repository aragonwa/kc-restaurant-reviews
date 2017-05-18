export const PAGER_ITEMS_PER_PAGE = 10;

export default class RestaurantUrls {
  static setEnvironment (environment) {
    let environmentUrl;

    switch (environment) {
      case 'staging':
        environmentUrl = 'webstaging.kingcounty.gov/info.kingcounty.gov';
        break;
      case 'development':
        environmentUrl = 'infoqa.kingcounty.gov';
        break;
      case 'production':
        environmentUrl = 'info.kingcounty.gov';
        break;
    }

    const apiUrls = {
      fullList: `//${environmentUrl}/healthservices/RestaurantInspectionsPublicAPI/api/business/1/47.0845/-122.5284/47.7803/-121.0657/`,
      business: `//${environmentUrl}/healthservices/RestaurantInspectionsPublicAPI/api/business/`,
      inspections: `//${environmentUrl}/healthservices/RestaurantInspectionsPublicAPI/api/inspections/`
    };

    return apiUrls;
  }
}
