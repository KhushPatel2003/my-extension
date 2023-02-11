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
  var url = "https://api.openai.com/v1/completions";
  var bearer = "Bearer " + "";
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: "what is this link about? " + url,
      max_tokens: 100,
      temperature: 0,
      top_p: 1,
      // n: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      // stream: false,
      // logprobs: null,
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
