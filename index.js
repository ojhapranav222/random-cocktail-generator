import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"))

app.get("/", async(req, res) => {
    try{
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const id = result.data.drinks[0].idDrink;
        const title = result.data.drinks[0].strDrink;
        const imageURL = result.data.drinks[0].strDrinkThumb;
        const drinkQuantity = [];
        const drinkIngredients = [];

        for (let i = 1; i<=15; i++){
            const ingredientKey = `strIngredient${i}`;

            if (result.data.drinks[0][ingredientKey]){
                drinkIngredients.push(result.data.drinks[0][ingredientKey])
            }
        }
        for (let i = 1; i<=15; i++){
            const measureKey = `strMeasure${i}`;

            if (result.data.drinks[0][measureKey]){
                drinkQuantity.push(result.data.drinks[0][measureKey])
            }
        }

        const data = {id: id,
                    image: imageURL,
                    title: title,
                    ingredients: drinkIngredients,
                    quantity: drinkQuantity,
                    }

        res.render("index.ejs", data)
    } catch(error){
        console.error("cannot fetch data");
    } 
})

app.post("/random", async (req, res) => {
    try{
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const id = result.data.drinks[0].idDrink;
        const title = result.data.drinks[0].strDrink;
        const imageURL = result.data.drinks[0].strDrinkThumb;
        const drinkQuantity = [];
        const drinkIngredients = [];

        for (let i = 1; i<=15; i++){
            const ingredientKey = `strIngredient${i}`;

            if (result.data.drinks[0][ingredientKey]){
                drinkIngredients.push(result.data.drinks[0][ingredientKey])
            }
        }
        for (let i = 1; i<=15; i++){
            const measureKey = `strMeasure${i}`;

            if (result.data.drinks[0][measureKey]){
                drinkQuantity.push(result.data.drinks[0][measureKey])
            }
        }

        const data = {id: id,
                    image: imageURL,
                    title: title,
                    ingredients: drinkIngredients,
                    quantity: drinkQuantity,
                    }

        res.render("index.ejs", data)
    } catch(error){
        console.error("cannot fetch data");
    }
})

app.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
})