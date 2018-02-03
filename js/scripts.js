$(document).ready(function () {
    var url = 'http://api.themoviedb.org/3/',
        mode = 'search/multi?',
        language = 'language=en-US',
        key = 'api_key=471a68f3428fcd738cc83b5e9d1178f2';

    $('button').click(function () {
        $('#movies').html('');
        var input = encodeURIComponent($('#search-text').val());
        url += mode + key + '&' + language + '&query=' + input;
        $.ajax({
            type: 'GET',
            url: url,
            async: false,
            jsonpCallback: 'testing',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function (movieResults) {
                var movieResult = movieResults.results;
                var image = 'http://image.tmdb.org/t/p/w300';
                movieResult.forEach(function (result) {
                    if (result.media_type == "tv") {
                        var resultShowBox = '<div class = "result-individual-container tvShow" id="' + result.id + '">';
                        resultShowBox += '<img src= "' + image + result.poster_path + ' ";>';
                        resultShowBox += '<h5>' + result.original_name + '</h5>';
                        resultShowBox += '<h6>' + result.first_air_date + '</h6>';
                        resultShowBox += '<h6>' + result.media_type + '</h6>';
                        resultShowBox += '<h6>' + result.popularity + '</h6>';
                        resultShowBox += '<h6>' + result.genre_ids + '</h6>';
                        resultShowBox += '<h6>' + result.original_language + '</h6>';
                        resultShowBox += '<h6>' + result.origin_country + '</h6>';
                        resultShowBox += '<p>' + result.overview + '</p>';
                        resultShowBox += '</div>';
                        $("#movies").append(resultShowBox);
                    } else if (result.media_type == "movie") {
                        var resultMovieBox = '<div class = "result-individual-container movie" id="' + result.id + '">';
                        resultMovieBox += '<img src= "' + image + result.poster_path + ' ";>';
                        resultMovieBox += '<h5>' + result.title + '</h5>';
                        resultMovieBox += '<h6>' + result.release_date + '</h6>';
                        resultMovieBox += '<h6>' + result.media_type + '</h6>';
                        resultMovieBox += '<h6>' + result.popularity + '</h6>';
                        resultMovieBox += '<h6>' + result.genre_ids + '</h6>';
                        resultMovieBox += '<h6>' + result.original_language + '</h6>';
                        resultMovieBox += '<h6>' + result.original_title + '</h6>';
                        resultMovieBox += '<p>' + result.overview + '</p>';
                        resultMovieBox += '</div>';
                        $("#movies").append(resultMovieBox);
                    } else if (result.media_type == "person") {
                        var resultPerson = '<div class = "result-individual-container person" id="' + result.id + '">';
                        resultPerson += '<img src= "' + image + result.profile_path + ' ";>';
                        resultPerson += '<h5>' + result.name + '</h5>';
                        $.each(movieResult.known_for, function(knownForMovies){
                            resultPerson += '<h6>' + result.known_for.original_title + '</h6>';
                            resultPerson += '<h6>' + result.known_for.release_date + '</h6>';
                        });
                        resultPerson += '<h6>' + result.popularity + '</h6>';
                        resultPerson += '</div>';
                        $("#movies").append(resultPerson);
                    }
                });
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    });
    $('#search-text').keypress(function (e) {
        var key = e.which;
        if (key == 13) // the enter key code
        {
            $('button').click();
            return false;
        }
    });
});