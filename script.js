const jokeText = document.querySelector(".joke"),
jokeBtn = document.querySelector("button"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

function randomJoke(){
    jokeBtn.classList.add("loading");
    jokeBtn.innerText = "Loading Joke...";
    fetch("https://icanhazdadjoke.com/", requestOptions)
  .then((response) => response.json())
  .catch((error) => console.error(error)).then(result => {
        jokeText.innerText = result.joke;
        jokeBtn.classList.remove("loading");
        jokeBtn.innerText = "Give me an other one";
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!jokeBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`jokeText.innerText`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(jokeText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${jokeText.innerText}`;
    window.open(tweetUrl, "_blank");
});

jokeBtn.addEventListener("click", randomJoke);