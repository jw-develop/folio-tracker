

// Documentation for API at https://financialmodelingprep.com/developer/docs/#Company-Profile
export function capTier(cap: number) {
  if (cap > 85000000000)
    return 0;
  else if (cap > 10000000000)
    return 1;
  else if (cap > 2000000000)
    return 2;
  else
    return 3;
}
