
export const isInBudget = (aPurchase) => {
  //for the purposes of this assignment, a purchase is in budget if it is 15% or less of the cash on hand
  const budget = aPurchase.cashOnHand * .15;
  return aPurchase.price <= budget;


}