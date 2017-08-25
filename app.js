'use strict'

const APIKey = "AIzaSyBL06DgYp59dK1Bt0tUWBoQhusGNXRzKRI"
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

function getDataFromAPI(searchTerm, callback) {
  const params = {
    part: 'snippet',
    key: `${APIKey}`,
    q: `${searchTerm}`,
    type: 'video'
  }

  $.getJSON(YOUTUBE_SEARCH_URL, params, callback)
}

function renderResult(result) {
  console.log(result)
  return `<li>
      <h3>${result.snippet.title}</h3>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
        <img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}">
      </a>
    </li>`
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item))
  $('.js-search-results').html(results)
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault()
    const queryTarget = $(event.currentTarget).find('.js-query')
    const query = queryTarget.val()

    // reset the input
    queryTarget.val('')

    getDataFromAPI(query, displayYouTubeSearchData)
  })
}

$(watchSubmit)
