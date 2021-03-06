// -------------ACTIONS UPDATED IN DATABASE
function showConfirmation(result) {
    
    if (result.result_code == "login"){
        window.location.href = "/login";
    } else if (result.result_code == "added"){
        var  buttonClicked = result.action_type + "-" + result.place_id;
        $("#"+buttonClicked).addClass("selected");
        console.log("Class added!");
        feedMap();
    } else{
        var  buttonClicked = result.action_type + "-" + result.place_id;
        $("#"+buttonClicked).removeClass("selected");
        console.log("Class removed!");
        feedMap();
    }
}

function updateActionTable(evt){
    evt.preventDefault();
    console.log(this.classList[3]+" button has been clicked.");
    debugger;

    var formInputs = {
        "action_type": this.classList[3],
        "place_id": this.id.slice(4)
    };

    $.post("/add-action.json", 
           formInputs,
           showConfirmation
           );
}
$(document).on('click', '.sav', updateActionTable);
$(document).on('click', '.hbh', updateActionTable);


// -------------SECONDARY SEARCH UPDATES SEARCH RESULTS

function showResults(resList){
    $("#place-results").remove();
    console.log("after removing the old results");
    if (!resList){
        $('#results-list').append("<ul id='place-results'> <div id='data_goes_here'> No results found </div> </ul>");
    } else {
        $('#results-list').append("<ul id='place-results'> <div id='data_goes_here'> </div> </ul>");
        var i;
        var j;
        for (i = 0; i < resList.length; i++) {
            $('#data_goes_here').append("<li class='one-result'> <a href='/places/"+ resList[i].place_id + "'>" + resList[i].name + "</a> <div id='tag-div-" + resList[i].place_id + "'> </div> <form id='add-action-form'> <button type='button' id='sav-" + resList[i].place_id + "' class='btn btn-default btn-sm sav' value='Bookmark'> Save <span id='sav-" + resList[i].place_id + "-glyp' class='glyphicon glyphicon-star-empty' aria-hidden='true'></span> </button> <button type='button' id='hbh-" + resList[i].place_id + "' class='btn btn-default btn-sm hbh' value='Been here'> Been Here <span id='hbh-" + resList[i].place_id + "-glyp' class='glyphicon glyphicon-flag' aria-hidden='true'></span> </button> </form> </li>");

            if (jQuery.inArray("sav", resList[i].place_actions) > -1){
                var buttonId = "sav-" + resList[i].place_id;
                console.log(buttonId);
                $("#"+buttonId).addClass("selected");
            }
            if (jQuery.inArray("hbh", resList[i].place_actions) > -1){
                var buttonId = "hbh-" + resList[i].place_id;
                console.log(buttonId);
                $("#"+buttonId).addClass("selected");
            }
            $('#tag-div-'+resList[i].place_id).append(resList[i].tags[0]);
        }
    }
    
}

function submitSearch(evt){
    evt.preventDefault();

    var formInputs = {
        "sort_type": "sort-default",
        "city_search": $("#city-search-alt").val()
    };

    $("#hidden-span").html($("#city-search-alt").val());

    $.get('/search.json',
            formInputs,
            showResults);
}

$("#search-button-alt").on('click', submitSearch);


// -------------SORT BY BUTTONS UPDATE SEARCH RESULTS
// function showSomething(result){
//     console.log(result);
// }

function submitSortby(evt){
    evt.preventDefault();

    var formInputs = {
        "sort_type": this.id,
        "city_search": $("#hidden-span").html() 
    };

    console.log("type: "+ this.id);
    console.log("city: "+ $("#hidden-span").html());

    $.get("/search.json", 
           formInputs,
           showResults
           );
}

$("#sort-default").on('click', submitSortby);
$("#sort-least-pop").on('click', submitSortby);
$("#sort-name").on('click', submitSortby);