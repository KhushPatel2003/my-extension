// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   var url = tabs[0].url;
//   var urlDisplay = document.getElementById("urlDisplay");
//   urlDisplay.innerHTML = "Current URL: " + url;
// });

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var url = tabs[0].url;
  var urlDisplay = document.getElementById("urlDisplay");
  urlDisplay.innerHTML = "Current URL: " + url;

  // OpenaiFetchAPI(url);
  CustomSearchJSONAPI(url);
});

function CustomSearchJSONAPI(url) {
  const API_KEY = "AIzaSyDVe_KMLF7Eb - HwD_En1MwGEXF1RHv4CgY";
  const CSE_ID = "21b6060a515e64f50";
  const query = "black shoes";
  const numResults = 10;

  const url1 = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${query}&num=${numResults}`;

  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      const arr = data.items;
      // console.log(data.items);
      for (var i = 0; i < arr.length; i++) {
        console.log(arr[i].link);
      }

      // Do something with the search results
    })
    .catch((error) => {
      console.error(error);
    });
}

function OpenaiFetchAPI(url) {
  console.log("Calling GPT3 at: " + url);
  var url = "https://api.openai.com/v1/completions";
  var bearer =
    "Bearer " + "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";
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
