/* 
Picture to Sandbox Converter
Made January 2019
www.github.com/Seb-4/
*/

// Get image
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = document.getElementById("img");

var size = 5;

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img, 0, 0, img.width, img.height);

var points = [];
var fis = [];
var fullImage = [];

// Array in array searching
function searchForArray(haystack, needle){
  var i, j, current;
  for(i = 0; i < haystack.length; ++i){
    if(needle.length === haystack[i].length){
      current = haystack[i];
      for(j = 0; j < needle.length && needle[j] === current[j]; ++j);
      if(j === needle.length)
        return true;
    }
  }
  return false;
}

var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	var compare = function (item1, item2) {
		// Compare two items
		// Get the object type
	var itemType = Object.prototype.toString.call(item1);

	// If an object or array, compare recursively
	if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
		if (!isEqual(item1, item2)) return false;
	}

	// Otherwise, do a simple comparison
	else {

		// If the two items are not the same type, return false
		if (itemType !== Object.prototype.toString.call(item2)) return false;

		// If it's a function, convert to a string and compare
		// Otherwise, just compare
		if (itemType === '[object Function]') {
			if (item1.toString() !== item2.toString()) return false;
		} else {
			if (item1 !== item2) return false;
		}

	}
};
	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			compare(value[i], other[i]);
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				compare(value[key], other[key]);
			}
		}
	}

	// If nothing failed, return true
	return true;

};


// Main function
function getColor(x, y) {
    var data = ctx.getImageData(size*x, size*y, 1, 1).data;
    
    var r = data[0];
    var g = data[1];
    var b = data[2];
    
    var color = [r, g, b];
    
    if (!searchForArray(points, color)) {
        points.push(color);
    }
    fis.push(color);
}

// Give Number to pixel Function
function giveNumber(x, y) {
  for (var i=0; i<points.length; i++) {
    console.log(fullImage[y][x], points[i]);
    if (isEqual(fullImage[y][x], points[i])) {
      fullImage[y][x] = i;
      console.log(i);
      return;
    }
  }
}

// Cycle Through
for (var j=1; j<img.height/size; j++) {
    for (var i=1; i<img.width/size; i++) {
        getColor(i, j);
        
    }
    fullImage.push(fis);
    fis = [];
}

// Give each pixel a value

for (var j=0; j<fullImage.length; j++) {
    for (var i=0; i<fullImage[0].length; i++) {
        giveNumber(i, j);
        console.log(fullImage[j][i]);
    }
    
}

console.log(fullImage);
console.log(points);
