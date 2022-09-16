const convertDate = () => {
  let date = new Date().toLocaleString("pt-BR", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  return date;
};

const float = (money) => {
  return parseFloat(money);
};

module.exports = { convertDate, float };
