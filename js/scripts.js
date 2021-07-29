// Utility Logic

function noInputtedWord(word, text) {
  return ((text.trim().length === 0) || (word.trim().length === 0));
}

// Business Logic

function wordCounter(text) {
  const censoredText = bannedWords(text);
  if (censoredText.toString().trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  censoredText.split(" ").forEach(function(element) {
    if (!Number(element)) {
      wordCount++;
    }
  });
  return wordCount;
}

function bannedWords(text) {
  const banned = ["zoinks","muppeteer","biffaroni","loopdaloop"];
  let wordArray = text.split(" ");
  let newArray = [];
  wordArray.forEach(function(element) {
      if (!banned.includes(element)) {
        newArray.push(element);
      }
  });
  let fillterdArr = newArray.filter(word => word !== "")
  return fillterdArr.join(" ");
}

function numberOfOccurrencesInText(word, text) {
  const censoredText = bannedWords(text);
  if (noInputtedWord(word, censoredText)) {
    return 0;
  }
  const wordArray = censoredText.split(" ");
  let wordCount = 0;
  wordArray.forEach(function(element) {
    if (element.toLowerCase().includes(word.toLowerCase())) {
      wordCount++;
    }
  });
  return wordCount;
}

function boldPassage(word, text) {
  const censoredText = bannedWords(text);
  if (noInputtedWord(word, censoredText)) {
    return "";
  }
  let textArray = censoredText.split(" ");
  textArray.forEach(function(element, index) { 
    if (element.toLowerCase().includes(word.toLowerCase())) {
      textArray[index] = textArray[index].replace(word , ("<b>" + word + "</b>"))
    }
  })
  console.log(textArray)
  return "<p>" + textArray.join(" ") + "</p>";
}

function uniqueWords(userString) {
  wordArr = userString.toLowerCase().split(" ")
  let fillterdArr = wordArr.filter((word, index) => {
    return wordArr.indexOf(word) === index;
  });
  return fillterdArr
}

function commonWords(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let arr = uniqueWords(text)
  let wordCountArr = [];
  arr.forEach(function (word) {
    let count = numberOfOccurrencesInText(word, text);
    wordCountArr.push([word, count]);
  })
  wordCountArr.sort(compareNumbers);
  return wordCountArr;
}

function compareNumbers(a, b) {
  return b[1] - a[1]
}

// UI Logic

$(document).ready(function(){
  $("form#word-counter").submit(function(event){
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
  $("#total-count").html(wordCount);
  $("#selected-count").html(occurrencesOfWord);
  $("#bolded-passage").html(boldPassage(word, passage));
  });
});