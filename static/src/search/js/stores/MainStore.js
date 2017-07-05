import alt from '../components/Dispatcher';
import ApiSource from '../sources/ApiSource';
import MainActions from '../actions/MainActions';

class Investor {
  constructor(data){
    this.investorName = data["investor"];
    this.latentDemand = data["latent_demand_value"];
  }
}

class AssetData {
  constructor(data){
    this.investors = [];
    data["investors"].forEach((data)=>{this.investors.push(new Investor(data))});
    this.currentMarketCap = data["current_market_cap"];
    this.ticker = data["ticker"];
    this.companyName = data["company_name"];
    this.fundamentalValue = data["fundamental_value"];
    this.latentDemandValue = data["total_latent_demand_value"];
    this.householdValue = data["household_value"];
  }
}

export class MainStore {

  constructor() {
    this.registerAsync(ApiSource);
    this.isLoading = true;
    this.hasError = false;
    this.currentAsset = null;
    this.bindListeners({
      loadingResults: MainActions.loadingResults,
      receivedResults: MainActions.receivedResults,
      fetchingResultsFailed: MainActions.fetchingResultsFailed
    });
  }
  loadingResults(){
    this.isLoading = true;
  }
  receivedResults(payload){
    this.currentAsset = new AssetData(payload["data"]);
    this.isLoading = false;
    this.hasError = false;
  }
  fetchingResultsFailed(payload){
    this.hasError = true;
    this.isLoading = false;
  }
  search(query) {
    if (!this.getInstance().isLoading()) {
      this.getInstance().performSearch(query);
    }
  }
}

export default alt.createStore(MainStore, 'MainStore');