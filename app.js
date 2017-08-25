'use strict'

const APIKey = "AIzaSyBL06DgYp59dK1Bt0tUWBoQhusGNXRzKRI"
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

function getDataFromAPI(searchTerm, callback) {
  const params = {
    part: 'snippet',
    key: `${APIKey}`,
    q: `${searchTerm}`
  }

  $.getJSON(YOUTUBE_SEARCH_URL, params, callback)
}

function renderResult(result) {
  console.log(result)
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault()
    const queryTarget = $(event.currentTarget).find('.js-query')
    const query = queryTarget.val()

    // reset the input
    queryTarget.val('')

    getDataFromAPI(query, renderResult)
  })
}

$(watchSubmit)
