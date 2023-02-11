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
      prompt: "write me a summary of this article: " + url,
      max_tokens: 300,
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
