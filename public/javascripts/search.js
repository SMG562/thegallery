$(document).ready(function(){
$('input.typeahead').typeahead({
name: 'search_people',
remote: 'http://localhost:3000/search?key=%QUERY',
limit: 10
});
});