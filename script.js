//Variables
const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
// function to get elements by ID without writing whole line
const get = (param) => document.getElementById(`${param}`);
// gitHub API url
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;
const body = document.getElementsByTagName("body");
const icons = document.getElementsByTagName("i");
console.log(icons);

const profileStatCon = document.getElementsByClassName(".profile-stat");
// initializing function showing pranay guptas data

initUI();

//SWITCH TO DARK MODE - activateDarkMode()
function darkModeProperties() {
  document.body.style.background = "#141D2F";
  document.body.style.background =
    "radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% ";
  // changing values of global variables
  root.setProperty("--lm-bgsw", "#141D2F");
  root.setProperty("--lm-bg-content", "#1E2A47");
  //   profileStatCon.style.backgroundcolor = "#141D2F";
  root.setProperty("--lm-text", "white");
  root.setProperty("--lm-text-alt", "white");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
  modetext.innerText = "LIGHT";
  modeicon.src = "./assets/images/sun-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(1000%)");
  //   body.style.backgroundColor = "#141D2F";
  root.setProperty("--lm-icon-color", "#ffffff");

  darkMode = true;
  console.log("darkmode changed to " + darkMode);
  localStorage.setItem("dark-mode", true);
  console.log("setting dark mode to false");

  console.log("setting dark mode to true");
}

//SWITCH TO LIGHT MODE - activateLightMode()
function lightModeProperties() {
  document.body.style.background = "linear-gradient(to bottom,#fbc7d4,#9796f0)";
  // changing values of global variables
  root.setProperty("--lm-bgsw", "#F6F8FF");
  root.setProperty("--lm-bg-content", "#FEFEFE");
  root.setProperty("--lm-text", "#4B6A9B");
  root.setProperty("--lm-text-alt", "#2B3442");
  //   root.setProperty("--lm-shadow-xl", "rgba(4, 11, 39, 0.753)");
  root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.80)");

  modetext.innerText = "DARK";
  modeicon.src = "./assets/images/moon-icon.svg";
  root.setProperty("--lm-icon-bg", "brightness(100%)");
  root.setProperty("--lm-icon-color", "#4b6a9b");
  darkMode = false;
  console.log("darkmode changed to " + darkMode);

  localStorage.setItem("dark-mode", false);
  console.log("setting dark mode to false");
}

// function to run at start and initialize values
function initUI() {
  //initialising dark-mode variable to false;
  //darkMode = true -> dark mode enable karna h
  //darMode = false -> light mode enable karna h
  darkMode = false;

  // dark mode default
  // prefersDarkMode returns true or false for dark mode from browserr
  const prefersDarkMode =
    window.matchMedia && window.matchMedia("prefers-color-scheme:dark").matches;

  const value = localStorage.getItem("darkMode");
  if (value == null) {
    // setting value in localStorage
    localStorage.setItem("dark-mode", darkMode);
    // default
    lightModeProperties();
  } else if (value == "true") {
    // setting dark mode properties to root elements
    darkModeProperties();
  } else if (value == "false") {
    lightModeProperties();
  }

  //by default, pranaygupta ki info show krre h UI pr
  //   API call
  getUserData(url + "thepranaygupta");
}

//  API call
async function getUserData(gitUrl) {
  try {
    const response = await fetch(gitUrl);
    const data = await response.json();
    console.log(data);
    updateProfile(data);
  } catch (err) {
    throw err;
  }
}

function updateProfile(data) {
      // in case of user not found we get a message = "Not Found" in data object
  if (data.message !== "Not Found") {
    noresults.style.display = "none";
    // to check input from data are null or not. If null then reduce opacity
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 0.5;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    // profile pic
    avatar.src = `${data.avatar_url}`;
    // user name will be either data.login or data.name
    userName.innerText = data.name === null ? data.login : data.name;
    // username 
    user.innerText = `@${data.login}`;
    // userneme url setting  
    user.href = `${data.html_url}`;
    // splitting datesegments
    datesegments = data.created_at.split("T").shift().split("-");
    console.log(datesegments);
    // setting date
    date.innerText = `Joined ${datesegments[2]} ${
      months[datesegments[1] - 1]
    } ${datesegments[0]}`;
    // checking if bio is empty or not
    bio.innerText =
      data.bio == null ? "This profile has no bio" : `${data.bio}`;
    //  setting repos, followers and following  
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    // ckecking location, webpage, twitter, company
    user_location.innerText = checkNull(data.location, user_location)
      ? data.location
      : "Not Available";

    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter)
      ? data.twitter_username
      : "Not Available";
    //   twitter url
    twitter.href = checkNull(data.twitter_username, twitter)
      ? `https://twitter.com/${data.twitter_username}`
      : "#";
    company.innerText = checkNull(data.company, company)
      ? data.company
      : "Not Available";

    // searchbar.classList.toggle("active");
    // profilecontainer.classList.toggle("active");
  } else {
    noresults.style.display = "block";
  }
}



// switching mode
btnmode.addEventListener("click", function () {
  // on clicking the button if darkMode value = false, then activate darkMode;
  if (darkMode == false) {
    darkModeProperties();
  } else {
    lightModeProperties();
  }
});

// when submit is clicked
btnsubmit.addEventListener("click", () => {
  if (input.value !== "") {
    getUserData(url + input.value);
  }
});

// on pushing "enter" key call getUserData()
// third argument "false" is for "useCapture field"
input.addEventListener(
  "keydown",
  function (e) {
    if (e.key === "Enter") {
      if (input.value !== "") {
        getUserData(url + input.value);
      }
    }
  },
  false
);

// hiding error msg when starting to type in searchBar
input.addEventListener("input", function () {
  noresults.style.display = "none";
});
