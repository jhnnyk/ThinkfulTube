'use strict'

const APIKey = "AIzaSyBL06DgYp59dK1Bt0tUWBoQhusGNXRzKRI"
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"
const SEARCH_PARAMS = {
  part: 'snippet',
  key: `${APIKey}`,
  type: 'video'
}

function getDataFromAPI(callback) {
  $.getJSON(YOUTUBE_SEARCH_URL, SEARCH_PARAMS, callback)
}

function renderResult(result) {
  console.log(result)
  return `<li>
      <h3>${result.snippet.title}</h3>
      <p>
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
          <img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}">
        </a>
        <a href="https://www.youtube.com/channel/${result.snippet.channelId}">${result.snippet.channelTitle}</a><br>
        ${result.snippet.description}
      </p>
    </li>`
}

function displayYouTubeSearchData(data) {
  console.log(data)
  $('.js-search-results').before('<h2>Results</h2>')
  const results = data.items.map((item, index) => renderResult(item))
  $('.js-search-results').html(results)
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault()
    const queryTarget = $(event.currentTarget).find('.js-query')
    SEARCH_PARAMS.q = queryTarget.val()

    // reset the input
    queryTarget.val('')

    getDataFromAPI(displayYouTubeSearchData)
  })
}

$(watchSubmit)
