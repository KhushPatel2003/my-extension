// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   var url = tabs[0].url;
//   var urlDisplay = document.getElementById("urlDisplay");
//   urlDisplay.innerHTML = "Current URL: " + url;
// });

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var url = tabs[0].url;
  var urlDisplay = document.getElementById("urlDisplay");
  console.log(urlDisplay);

  OpenaiFetchAPI(url);
});

document.getElementById("showMore").addEventListener("click", function () {
  let boxes = document.querySelectorAll("#box");
  for (let i = 3; i < boxes.length; i++) {
    boxes[i].style.display = "block";
  }
  this.style.display = "none";
});



// const ogImage = Object.items[0].pagemap.metatags[0]['og:image'];
// console.log(ogImage);

function CustomSearchJSONAPI(query) {
  console.log(" Calling Custom Search JSON API: " );
  const API_KEY = "AIzaSyAmHi8ZGUlbkWl-DKU4L84Yi0xyEcIETyA";
  const CSE_ID = "d66f90d53f030418b";
  const numResults = 10;

  const url1 = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${query}&num=${numResults}`;

  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const arr = data.items;
      for (var i = 0; i < arr.length; i++) {
        var imageDis = document.getElementById("og-image" + (i+1));
        console.log(imageDis)
        imageDis.src = getOGImage(data, i);
      }
      for (var i = 0; i < arr.length; i++) {
        var siteName = document.getElementById("site-name" + (i+1));
        const ogSiteName = getSiteName(data, i);
        siteName.innerHTML = ogSiteName;
      }

      // console.log(data.items);
      for (var i = 0; i < arr.length; i++) {
        console.log(arr[i].link);
      }

      document.getElementById("button1").addEventListener("click", function () {
        chrome.tabs.create({ url: arr[0].link });
      });
      document.getElementById("button2").addEventListener("click", function () {
        chrome.tabs.create({ url: arr[1].link });
      });
      document.getElementById("button3").addEventListener("click", function () {
        chrome.tabs.create({ url: arr[2].link });
      });
      document.getElementById("button4").addEventListener("click", function () {
        chrome.tabs.create({ url: arr[3].link });
      });
      document.getElementById("button5").addEventListener("click", function () {
        chrome.tabs.create({ url: arr[4].link });
      });
      document.getElementById("button6").addEventListener("click", function () {
        chrome.tabs.create({ url: arr[5].link });
      });
      document.getElementById("button7").addEventListener("click", function () {
        chrome.tabs.create({ url: arr[6].link });
      });
      document.getElementById("button8").addEventListener("click", function () {
        chrome.tabs.create({ url: arr[7].link });
      });
      document.getElementById("button9").addEventListener("click", function () {
        chrome.tabs.create({ url: arr[8].link });
      });
      document
        .getElementById("button10")
        .addEventListener("click", function () {
          chrome.tabs.create({ url: arr[9].link });
        });
      // Do something with the search results
    })
    .catch((error) => {
      console.error(error);
    });
}

function OpenaiFetchAPI(url) {
  console.log("Calling GPT3 at: " + url);
  var url1 = "https://api.openai.com/v1/completions";
  var bearer =
    "Bearer " + "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";
  fetch(url1, {
    method: "POST",
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt:
        "describe the product in this url in 7 words or less with nouns or adjectives that talk about the object name, color, gender it's associated with: " +
        url,
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
      CustomSearchJSONAPI(data["choices"][0].text);
    })
    .catch((error) => {
      console.log("Something bad happened " + error);
    });
}

function getOGImage(Object, i) {
  const ogImage = Object.items[i].pagemap.metatags[0]["og:image"];
  if (!ogImage || ! ogImage.startsWith("http")) {
    return "logo.png";
  }
  return ogImage;
}

function getSiteName(Object, i) {
  const ogSiteName = Object.items[i].pagemap.metatags[0]["og:site_name"];
  if (!ogSiteName) {
    return "No Site Name";
  }
  console.log(ogSiteName);
  if (ogSiteName.length > 20) {
    return ogSiteName.substring(0, 20) + "...";
  }
  return ogSiteName;
}