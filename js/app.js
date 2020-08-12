'use strict';

$.ajax('../data/page-1.json', {
  method: 'get',
  dataType: 'json'
}).then(function(){
  console.log('Great Success!');
});

const hornedAnimals = [];
const keywords = [];

function Animal (name, src, alt, keyword){
  this.name = name;
  this.src = src;
  this.altText = alt;
  this.keyword = keyword;

  hornedAnimals.push(this);
}

Animal.prototype.renderWithJquery = function() {

  const $clonedAnimal = $('section:first-child').clone();
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

    keywords.push(dataAnimal.keyword);

  });

  hornedAnimals.forEach(hornedAnimalsValue => hornedAnimalsValue.renderWithJquery());
  addDropdownItems();
};

const addDropdownItems = () => {
  const $dropdown = $('select');
  
  keywords.forEach(keyword => {
    const $option = $(`<option value = "${keyword}">${keyword}</option>`);

    $dropdown.append ($option);
  });
};

$('select').on('change', hideAnimals);

function hideAnimals(){
 const selectedKeyword = $(this).val();

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

$('li:first-child').hide();

//Referenced Material: https://www.w3schools.com/jquery/jquery_hide_show.asp

$.get('../data/page-1.json')
  .then(handleTheFileAnimals);


