module.exports = (user, token) => {
  const { email, firstName, lastName, phoneNumber, avatar, moreInfo, danceSchools } = user;
  return {
    email,
    firstName,
    lastName,
    phoneNumber: Number(phoneNumber),
    avatar,
    moreInfo,
    danceSchools,
    token,
  };
};
