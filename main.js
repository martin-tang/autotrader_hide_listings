var elClassName = "col-xs-12 result-item enhanced   priority-qa listing-redesign-dt";
var elArray;

navigation.addEventListener("navigate", e => {
    elArray = document.getElementsByClassName(elClassName);
    pinkify(elArray);
});

if (!document.getElementsByClassName)
{
    elArray= findElements(elClassName);
}
else
{
    elArray = document.getElementsByClassName(elClassName);
}
pinkify(elArray);




// functions 

function findElements(name){
    var elArray = [];
    var tmp = document.getElementsByClassName(elClassName);
    // Can also use elements with class name: col-xs-12 result-item enhanced   priority-qa listing-redesign-dt
    //console.log("Scanning :\"" + document.title + "\"");
    var regex = new RegExp("^.*" + "col-xs-12 result-item enhanced   priority-qa listing-redesign-dt" + ".*$");
    console.log("check here" + tmp);
    for ( var i = 0; i < tmp.length; i++ ) {
        if ( regex.test(tmp[i].name) ) {
            elArray.push(tmp[i]);
            console.log("Found one!");
        }
    }
    return elArray;
};
function pinkify(array_of_elements){
    for (var i = 0; i <array_of_elements.length; i++){
        array_of_elements[i].children[1].style.background = "pink";
    }
};