// for node

const TRIAL_URL = `https://dummyjson.com/recipes`;
console.log(TRIAL_URL);

const show = async (recipeName) => {
    try {
      const queryString = `?q=${recipeName}`;
      const res = await fetch(TRIAL_URL + queryString);
      const data = await res.json();
      console.log('Data:', data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };