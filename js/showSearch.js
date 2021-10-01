

function showSearch() {
    if (document.getElementById("searchIcon").className == "fa fa-times") {
        document.getElementById("searchIcon").className = "fa fa-search";
        document.getElementById("searchInput").style.display = "none";
        return;
    } else {
        document.getElementById("searchIcon").className = "fa fa-times";
        document.getElementById("searchInput").style.display = "block";

        return;
    }
}
