// to delete or rewrite

const BASE_URL = `${import.meta.env.VITE_MEAL_DB_URL}`;
console.log(BASE_URL);

const mealServiceFn = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

export default mealServiceFn;