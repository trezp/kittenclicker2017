!(function(){
  function Kitten(name, imgUrl){
    this.name = name;
    this.id = name.toLowerCase();
    this.counter = 0;
    this.imgUrl = imgUrl || "cute-kitten1.jpg"; 
    this.alt = `A kitten named ${this.name}.`;
  }

  const model = {
    kittens: [
      new Kitten("Barty"), 
      new Kitten("Greta", "cute-kitten2.jpg"), 
      new Kitten("Sam", "cute-kitten3.jpg"),
      new Kitten("Marge", "cute-kitten4.jpg"),
      new Kitten("Lester", "cute-kitten5.jpg"),
    ]
  }

  const view = {
    init: function(kittenList){
      $('.cat-nav').append(this.renderSideBar(kittenList));
      $('.cat-main-view').append(this.renderMain(kittenList[0]));   
      
      //kitten counter 
      $('#app').on("click", ".cat-details img", function(){
        const currentKitten = $(this).parent().attr('id');  
        controller.incrementCounter(currentKitten);
        view.updateView(kittenList, currentKitten);
      });

      //sidebar
      $('.container-main').on("click", ".cat-nav li", function(){
        const currentKitten = $(this).attr('id');
        view.updateView(kittenList, currentKitten);
      });

      //toggle change cat form
      $('#update-toggle').on("click", function(){
        $(this).toggleClass("active-button");
        $('.update').toggle();
      });

      //toggle new cat form
      $('#add-new-toggle').on("click", function(){
        $(this).toggleClass("active-button");
        $('.add-new').toggle();
      });

      //handle change cat form ***REALLY NEEDS REFACTOR***
      $('#update-submit').on('click', function(event){
        event.preventDefault();

        const currentKitten = $('.cat-details').attr('id');
        const catName = $('#catName').val() || currentKitten;
        const catClicks = $('#catClicks').val();
        const kittenObj = kittenList.filter(function(kitten){
          return kitten.id === currentKitten;
        });

        if (catClicks === ''){
          $('#catClicks').parent().find('span').remove();
          controller.updateKitten(currentKitten, catName, kittenObj[0].counter);
          view.updateView(kittenList, currentKitten);
          $('#catName').val('');
          $('#catClicks').val('');
        } else if (catClicks.length > 0 && isNaN(parseInt(catClicks))){
          $('#catClicks').parent().append('<span style="color:red">Please enter a number in the "clicks" field</span>');
        } else {
          $('#catClicks').parent().find('span').remove();
          controller.updateKitten(currentKitten, catName, parseInt(catClicks));
          view.updateView(kittenList, currentKitten);
          $('#catName').val('');
          $('#catClicks').val('');
        }
      });

      $('#add-new-submit').on('click', function(event){
        event.preventDefault();
        controller.createNewKitten($('#newName').val());
        view.updateView(kittenList, null);
      });

      $('#delete-submit').on('click', function(event){

      })
    },
    renderMain: function(kitten){
      return (
        `<div class="cat-details" id="${kitten.id}">
            <h2>${kitten.name}</h2>
            <img src="images/${kitten.imgUrl}" alt="${kitten.alt}">
            <h2>${kitten.name} clicked ${kitten.counter} times.</h2>
        </div> `
      )
    },
    renderSideBar: function(kittenList){
      return kittenList.map(function(kitten){
        return `<li id="${kitten.id}">${kitten.name}</li>`;
      });
    },
    updateView: function(kittenList, currentKitten){
      $('.cat-nav').empty();
      $('.cat-nav').append(view.renderSideBar(kittenList));
      kittenList.forEach(function(kitten){
        if (kitten.id === currentKitten){
          $('.cat-main-view').empty();
          $('.cat-main-view').append(view.renderMain(kitten)); 
        }    
      });
    }
  }
  const controller = {
    init: function(){
      view.init(this.getAllKittens());
    },
    getAllKittens: function(){
      return model.kittens;
    },
    createNewKitten: function(name, imgUrl){
      model.kittens.push(new Kitten(name, imgUrl));
    },
    updateKitten: function(kittenId, name, clicks){
      let newKitten = '';
      model.kittens.forEach(function(kitten){
        if(kittenId === kitten.id){
          kitten.id = name.toLowerCase();
          kitten.name = name; 
          kitten.counter = clicks;
          kitten.alt = `A kitten named ${kitten.name}.`;
          newKitten += kitten.id;
        }
      });
      view.updateView(this.getAllKittens(), newKitten);
    },
    deleteKitten(){
      //TODO
    },
    incrementCounter: function(kittenId){
      model.kittens.forEach(function(kitten){
        if(kittenId === kitten.id){
          kitten.counter = kitten.counter + 1;
        }
      });
    }
  }
  controller.init();
})();
