//API 1 Calling
let btn1 = document.querySelector("#button1");
btn1.addEventListener("click", async () => {
    let fact = await gestFacts();
    let h3 = document.querySelector("#result1");
    h3.innerText = fact;
})

let url1 = "https://catfact.ninja/fact";
async function gestFacts() {
    try {
        let res = await axios.get(url1);
        return res.data.fact;
    }
    catch (err) {
        return "ERROR--", err;
    }
}

//API 2 Calling
url2 = "https://dog.ceo/api/breeds/image/random"
let btn2 = document.querySelector("#button2");
btn2.addEventListener("click", async () => {
    let link = await getImage();
    let img = document.querySelector("#result2");
    img.setAttribute("src", link);
})

async function getImage() {
    try {
        let res = await axios.get(url2);
        return res.data.message;
    }
    catch (err) {
        return "ERROR--", err;
    }
}

//API 3 Calling
let url = "https://randomfox.ca/floof/";
let btn3 = document.querySelector("#button3");

btn3.addEventListener("click", async function () {
    try {
        let link = await getFImage();
        if (link && typeof link === "string") { // Check if the link is valid
            let img = document.querySelector("#result3");
            img.setAttribute("src", link);
        } else {
            console.error("Invalid image URL:", link);
            alert("Failed to fetch a valid image. Please try again.");
        }
    } catch (error) {
        console.error("Error in event listener:", error);
        alert("An error occurred. Please check the console for details.");
    }
});

async function getFImage() {
    try {
        let res = await axios.get(url);
        return res.data.image; // Correct property for the Random Fox Image API
    } catch (err) {
        console.error("Error fetching the fox image:", err); // Log the error
        return null; // Return null if fetching fails
    }
}


//API 4 Calling
let btn4 = document.querySelector("#button4");
btn4.addEventListener("click", async () => {
    let joke = await getJokes();
    let h3 = document.querySelector("#result4");
    h3.innerText = joke;
})

let url4 = "https://v2.jokeapi.dev/joke/Any?safe-mode";
async function getJokes() {
    try {
        let res = await axios.get(url4);
        return res.data.joke;
    }
    catch (err) {
        return "ERROR--", err;
    }
}

//API 5 Calling
let btn5 = document.querySelector("#button5");
btn5.addEventListener("click", async () => {
    let insult = await getinsult();
    let h3 = document.querySelector("#result5");
    h3.innerText = insult;
})

let url5 = "http://numbersapi.com/random/math";
async function getinsult() {
    try {
        let res = await axios.get(url5);
        return res.data;
    }
    catch (err) {
        return "ERROR--", err;
    }
}
