'use strict';

$.ajax('../data/page-1.json', {
  method: 'get',
  dataType: 'json'
}).then(function(){
  console.log('Great Success!');
});

const hornedAnimals = [];

function Animal (name, src, alt){
  this.name = name;
  this.src = src;
  this.altText = alt;

  hornedAnimals.push(this);
}

Animal.prototype.renderWithJquery = function() {

  const $clonedAnimal = $('section:first-child').clone();
  console.log($clonedAnimal);

  $clonedAnimal.find('h2').text(this.name);
  $clonedAnimal.find('img').attr('src', this.src).attr('alt', this.altText);
  $clonedAnimal.find('p').text(this.altText);

  $('main').append($clonedAnimal);

};

const handleTheFileAnimals = dataAnimals => {
  console.log(dataAnimals);
  dataAnimals.forEach(dataAnimals => {
    new Animal (dataAnimals.title, dataAnimals.image_url, dataAnimals.description, dataAnimals.keyword, dataAnimals.horns);
  });

  hornedAnimals.forEach(hornedAnimalsValue => hornedAnimalsValue.renderWithJquery());

};

$.get('../data/page-1.json')
  .then(handleTheFileAnimals);
