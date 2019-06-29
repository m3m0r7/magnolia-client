module.exports = {
  filterUserData: (user) => {
    let filtered = {};
    for (let key in user) {
      if (['password'].indexOf(key) !== -1) {
        continue;
      }
      filtered[key] = user[key];
    }
    return filtered;
  }
};
