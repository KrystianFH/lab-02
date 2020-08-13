'use strict';
 
$.ajax('../data/page-1.json', {
 method: 'get',
 dataType: 'json'
}).then(function(){
 console.log('Great Success!');
});
 
$.ajax('../data/page-2.json', {
 method: 'get',
 dataType: 'json'
}).then(function(){
 console.log('Great Success page 2!');
});
 
let hornedAnimals = [];
const keywords = [];
 
function Animal (name, src, alt, keyword, horns){
 this.name = name;
 this.src = src;
 this.altText = alt;
 this.keyword = keyword;
 this.horns = horns;
 
 hornedAnimals.push(this);
}
 
Animal.prototype.renderWithMustache = function(){
 const newHtml = Mustache.render($('#horned-animals').html(),this);
 $('main').append(newHtml);
};
 
Animal.prototype.renderWithJquery = function() {
 
 const $clonedAnimal = $('#photo-template').clone();
 console.log($clonedAnimal);
 
 $clonedAnimal.find('h2').text(this.name);
 $clonedAnimal.find('img').attr('src', this.src).attr('alt', this.altText);
 $clonedAnimal.find('p').text(this.altText);
 $clonedAnimal.attr('data-keyword', this.keyword);
 $('main').append($clonedAnimal);
 
};
 
const handleTheFileAnimals = dataAnimals => {
 console.log(dataAnimals);
 dataAnimals.forEach(dataAnimal => {
   new Animal (dataAnimal.title, dataAnimal.image_url, dataAnimal.description, dataAnimal.keyword, dataAnimal.horns);
  
   if (!keywords.includes(dataAnimal.keyword)) {
    
     keywords.push(dataAnimal.keyword);
    
   }
 
 });
 
 hornedAnimals.forEach(hornedAnimalsValue => hornedAnimalsValue.renderWithMustache());
 
 addDropdownItems();
};
 
const addDropdownItems = () => {
 const $dropdown = $('#keyword-dropdown');
  keywords.forEach(keyword => {
   const $option = $(`<option value = "${keyword}">${keyword}</option>`);
 
   $dropdown.append ($option);
 });
};
 
$('#keyword-dropdown').on('change', hideAnimals);
 
// This where we left off of lab 03
// $('#sort').on('change', sortAnimals);
 
// function sortAnimals(){
//   const selectedSort = $(this).val();
//   console.log(selectedSort);
 
//   hornedAnimals.sort( (a, b) => {
//     if(a < b) {
//       return 1;
//     } else if (a > b) {
//       return -1;
//     } else {
//       return 0;
//     }
//   })
//   return hornedAnimals;
 
// }
 
// $('main').empty();
 
// hornedAnimals.forEach(hornedAnimalsValue => hornedAnimalsValue.sortAnimals());
 
function hideAnimals(){
const selectedKeyword = $(this).val();
console.log(selectedKeyword);
$('section').hide();
 
hornedAnimals.forEach(function(dataAnimal){
 if(selectedKeyword === dataAnimal.keyword) {
   const name = dataAnimal.name;
   const imageOption = $('section');
   imageOption.each(function(){
     console.log(name);
     console.log('first if statement');
     if($(this).find('h2').text()=== name){
       $(this).show();
       console.log($(this),'it worked');
     }
   });
 }
});
}
 
//Referenced Material: https://www.w3schools.com/jquery/jquery_hide_show.asp
 
$('button').on('click', showPgTwo);
 
function showPgTwo(){
 
$('main').empty();
 
hornedAnimals = [];
 
$('option:not(:first-child)').remove();
 
$.get('../data/page-2.json')
.then(handleTheFileAnimals);
}
 
$.get('../data/page-1.json')
 .then(handleTheFileAnimals);
 