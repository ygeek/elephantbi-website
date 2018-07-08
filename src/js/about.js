var joinListOnClick = function(index) {
  var joinLists = document.getElementsByClassName('list-item');
  var joinListsLength = joinLists.length;
  for (var joinListsIndex = 0; joinListsIndex < joinListsLength; joinListsIndex++) {
    var item = joinLists[joinListsIndex];
    item.className = 'list-item';
  };
  joinLists[index].className = 'list-item list-select';
}

window.onload = function () {
  var joinLists = document.getElementsByClassName('list-item');
  var joinListsLength = joinLists.length;
  for (var joinListsIndex = 0; joinListsIndex < joinListsLength; joinListsIndex++) {
    var item = joinLists[joinListsIndex];
    var aelement = item.getElementsByTagName('a');
    const target = joinListsIndex;
    aelement[0].onclick = function() {
      joinListOnClick(target);
    };
  }
}
