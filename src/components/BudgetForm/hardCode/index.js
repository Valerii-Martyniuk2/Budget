export const budgetFormSelect = [
  { val: "Home", name: "Home" },
  { val: "Car", name: "Car" },
  { val: "Food", name: "Food" },
  { val: "Activities", name: "Activities" },
];
export const budgetForm = {
  value: "",
  date: new Date().toISOString().slice(0, 10),
  dateAndMonth: new Date().toISOString().slice(0, 7),
  comment: "",
};
