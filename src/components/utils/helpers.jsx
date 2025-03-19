
const companyId = () => {
    const user = localStorage.getItem("user");
    const user_id = JSON.parse(user)?.company_id;
    return user_id || NULL ;
  };

const loginId = () => {
    const user = localStorage.getItem("user");
    const user_id = JSON.parse(user)?.login_id;
    return user_id || NULL ;
};
