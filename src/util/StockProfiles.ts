

import { stocks } from "../constants";

export interface Profile {
    symbol: string;
    owned: string;
    sector: string;
    mktCap: number;
    price: number;
}

export async function getProfiles(): Promise<Profile[]> {
    let profs: Profile[] = [];
    for (let i = 0;i < stocks.length;i++) {
        let stock = stocks[i][0];
        const response = await fetch("https://financialmodelingprep.com/api/v3/company/profile/" + stock);
        const toJson: any = await response.json();
        let profile: Profile = await toJson.profile;
        profile.symbol = toJson.symbol;
        profile.owned = stocks[i][1]
        profs.push(profile);
    }
    return profs;
};