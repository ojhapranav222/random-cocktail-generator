// index.js
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

// Static files
app.use(express.static(path.join("public")));

// Views
app.set("view engine", "ejs");
app.set("views", path.join("views"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const id = result.data.drinks[0].idDrink;
    const title = result.data.drinks[0].strDrink;
    const imageURL = result.data.drinks[0].strDrinkThumb;
    const drinkQuantity = [];
    const drinkIngredients = [];

    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}`;
      if (result.data.drinks[0][ingredientKey]) {
        drinkIngredients.push(result.data.drinks[0][ingredientKey]);
      }
    }
    for (let i = 1; i <= 15; i++) {
      const measureKey = `strMeasure${i}`;
      if (result.data.drinks[0][measureKey]) {
        drinkQuantity.push(result.data.drinks[0][measureKey]);
      }
    }

    const data = {
      id: id,
      image: imageURL,
      title: title,
      ingredients: drinkIngredients,
      quantity: drinkQuantity,
    };

    res.render("index", data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.post("/random", async (req, res) => {
    try {
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const id = result.data.drinks[0].idDrink;
        const title = result.data.drinks[0].strDrink;
        const imageURL = result.data.drinks[0].strDrinkThumb;
        const drinkQuantity = [];
        const drinkIngredients = [];

        for (let i = 1; i <= 15; i++) {
            const ingredientKey = `strIngredient${i}`;

            if (result.data.drinks[0][ingredientKey]) {
                drinkIngredients.push(result.data.drinks[0][ingredientKey]);
            }
        }
        for (let i = 1; i <= 15; i++) {
            const measureKey = `strMeasure${i}`;

            if (result.data.drinks[0][measureKey]) {
                drinkQuantity.push(result.data.drinks[0][measureKey]);
            }
        }

        const data = {
            id: id,
            image: imageURL,
            title: title,
            ingredients: drinkIngredients,
            quantity: drinkQuantity,
        };

        res.render("index", data);
    } catch (error) {
        console.error("Cannot fetch data");
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
