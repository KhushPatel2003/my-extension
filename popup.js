// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   var url = tabs[0].url;
//   var urlDisplay = document.getElementById("urlDisplay");
//   urlDisplay.innerHTML = "Current URL: " + url;
// });

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var url = tabs[0].url;
  var urlDisplay = document.getElementById("urlDisplay");
  urlDisplay.innerHTML = "Current URL: " + url;

  OpenaiFetchAPI(url);
});

document.getElementById("showMore").addEventListener("click", function() {
  let boxes = document.querySelectorAll("#box");
  for (let i = 3; i < boxes.length; i++) {
    boxes[i].style.display = "block"; 
  }
  this.style.display = "none";
});

var url = "https://google.com";

document.getElementById("button").addEventListener("click", function() {
  chrome.tabs.create({ url: url });
});

function OpenaiFetchAPI(url) {
  console.log("Calling GPT3");
  var url = "https://api.openai.com/v1/engines/davinci/completions";
  var bearer =
    "Bearer " + "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";
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "write me a poem",
      max_tokens: 64,
      temperature: 0.5,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
      stop: null,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log(typeof data);
      console.log(Object.keys(data));
      console.log(data["choices"][0].text);
    })
    .catch((error) => {
      console.log("Something bad happened " + error);
    });
}