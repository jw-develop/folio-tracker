import { stocks } from "../constants";

let profs: any[] = [];

for (let i = 0;i < stocks.length;i++) {
    let stock = stocks[i][0];
    fetch("https://financialmodelingprep.com/api/v3/company/profile/" + stock)
    .then(async (e) => {
        const response = await e.json();
        let profile = response.profile;
        profile.symbol = response.symbol;
        profile.owned = stocks[i][1]
        profs.push(profile);
    });
}

export const profiles = profs;