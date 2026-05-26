// =============================================
//  API WONDERLAND — app.js
//  Fixed + enhanced version
// =============================================

// ---- Helpers ----

function setLoading(btn, on) {
    btn.classList.toggle("loading", on);
    btn.disabled = on;
}

function showText(resultEl, hintEl, copyBtn, text) {
    hintEl.classList.add("hidden");
    resultEl.innerText = text;
    resultEl.closest(".result-box").classList.add("has-content", "pop");
    copyBtn.classList.add("visible");
    // remove pop class after animation so it can replay next time
    setTimeout(() => resultEl.closest(".result-box").classList.remove("pop"), 400);
}

function showImage(imgEl, hintEl, src) {
    imgEl.src = src;
    imgEl.classList.add("visible");
    hintEl.classList.add("hidden");
    imgEl.closest(".result-box").classList.add("has-content");
}

function setupCopy(copyBtnId, resultId) {
    const btn = document.querySelector("#" + copyBtnId);
    const result = document.querySelector("#" + resultId);
    btn.addEventListener("click", () => {
        navigator.clipboard.writeText(result.innerText).then(() => {
            btn.textContent = "✓ Copied!";
            btn.classList.add("copied");
            setTimeout(() => {
                btn.textContent = "⧉ Copy";
                btn.classList.remove("copied");
            }, 1800);
        });
    });
}

// ---- API 1 — Cat Facts ----
let btn1 = document.querySelector("#button1");
let url1 = "https://catfact.ninja/fact";

btn1.addEventListener("click", async () => {
    setLoading(btn1, true);
    let fact = await getCatFact();
    let h3   = document.querySelector("#result1");
    let hint = document.querySelector("#button1").closest(".section-head").nextElementSibling.querySelector(".placeholder-hint");
    let copy = document.querySelector("#copy1");
    showText(h3, hint, copy, fact);
    setLoading(btn1, false);
});

async function getCatFact() {
    try {
        let res = await axios.get(url1);
        return res.data.fact;
    } catch (err) {
        console.error("Cat Facts error:", err);
        return "⚠ Could not fetch a cat fact. Try again!";
    }
}

setupCopy("copy1", "result1");

// ---- API 2 — Random Dog Image ----
let url2 = "https://dog.ceo/api/breeds/image/random";
let btn2  = document.querySelector("#button2");

btn2.addEventListener("click", async () => {
    setLoading(btn2, true);
    let link = await getDogImage();
    if (link) {
        let img  = document.querySelector("#result2");
        let hint = document.querySelector(".api2-img .placeholder-hint");
        showImage(img, hint, link);
    }
    setLoading(btn2, false);
});

async function getDogImage() {
    try {
        let res = await axios.get(url2);
        if (res.data.status === "success" && res.data.message) {
            return res.data.message;
        }
        throw new Error("Unexpected response format");
    } catch (err) {
        console.error("Dog Image error:", err);
        alert("⚠ Failed to fetch a dog image. Try again!");
        return null;
    }
}

// ---- API 3 — Random Fox Image ----
let url3 = "https://randomfox.ca/floof/";
let btn3  = document.querySelector("#button3");

btn3.addEventListener("click", async () => {
    setLoading(btn3, true);
    let link = await getFoxImage();
    if (link) {
        let img  = document.querySelector("#result3");
        let hint = document.querySelector(".api3-txt2 .placeholder-hint");
        showImage(img, hint, link);
    }
    setLoading(btn3, false);
});

async function getFoxImage() {
    try {
        let res = await axios.get(url3);
        return res.data.image || null;
    } catch (err) {
        console.error("Fox Image error:", err);
        alert("⚠ Failed to fetch a fox image. Try again!");
        return null;
    }
}

// ---- API 4 — Jokes ----
// FIX: JokeAPI returns "single" (.joke) OR "twopart" (.setup + .delivery)
let btn4 = document.querySelector("#button4");
let url4 = "https://v2.jokeapi.dev/joke/Any?safe-mode";

btn4.addEventListener("click", async () => {
    setLoading(btn4, true);
    let joke = await getJoke();
    let h3   = document.querySelector("#result4");
    let hint = document.querySelector("#button4").closest(".section-head").nextElementSibling.querySelector(".placeholder-hint");
    let copy = document.querySelector("#copy4");
    showText(h3, hint, copy, joke);
    setLoading(btn4, false);
});

async function getJoke() {
    try {
        let res = await axios.get(url4);
        if (res.data.type === "single") {
            return res.data.joke;
        } else if (res.data.type === "twopart") {
            return res.data.setup + "\n\n" + res.data.delivery;
        }
        return "Couldn't parse this joke. Try again!";
    } catch (err) {
        console.error("Jokes error:", err);
        return "⚠ Could not fetch a joke. Try again!";
    }
}

setupCopy("copy4", "result4");

// ---- API 5 — Number Facts ----
// FIX: numbersapi.com is HTTP-only + no CORS → use corsproxy.io wrapper
let btn5 = document.querySelector("#button5");
let url5 = "https://corsproxy.io/?url=http://numbersapi.com/random/math";

btn5.addEventListener("click", async () => {
    setLoading(btn5, true);
    let fact = await getNumberFact();
    let h3   = document.querySelector("#result5");
    let hint = document.querySelector("#button5").closest(".section-head").nextElementSibling.querySelector(".placeholder-hint");
    let copy = document.querySelector("#copy5");
    showText(h3, hint, copy, fact);
    setLoading(btn5, false);
});

async function getNumberFact() {
    try {
        let res = await axios.get(url5);
        return res.data;
    } catch (err) {
        console.error("Number Facts error:", err);
        return "⚠ Could not fetch a number fact. Try again!";
    }
}

setupCopy("copy5", "result5");