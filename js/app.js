//CHANGE CAT IS BROKEN
  //IMAGE AND DETAILS DO NOT SHOW UNTIL THE SIDEBAR IS CLICKED -- THE CAT DETAIL
  //AREA IS NOT UPDATING 

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
      $('.cat-main-view').append(this.renderMain(kittenList, kittenList[0].id));   

      //this should be this.updateView, and updateView called
      $('#app').on('click', '.cat-details img', app.incrementCounter);
      $('#app').on('click', '.cat-nav li', app.getClickedKitten);

      $('.toggle-btn').on("click", function(){
        $(this).toggleClass("active-button");
      });

      //toggle change cat form
      $('#update-toggle').on("click", function(){
        $('.update').toggle();
      });

      //toggle new cat form
      $('#add-new-toggle').on("click", function(){
        $('.add-new').toggle();
      });

      //handle change cat form ***REALLY NEEDS REFACTOR***
      $('#update-submit').on('click', function(event){

        //this function should just the form values and pass to the controller,
        //which will then prepare the data and pass to model
        event.preventDefault();

        const currentKitten = $('.cat-details').attr('id');
        const catName = $('#catName').val() || currentKitten;
        const catClicks = $('#catClicks').val();
        const kittenObj = kittenList.filter(function(kitten){
          return kitten.id === currentKitten;
        });

        if (catClicks === ''){
          $('#catClicks').parent().find('span').remove();
          app.updateKitten(currentKitten, catName, kittenObj[0].counter);
          view.updateView(kittenList, currentKitten);
          $('#catName').val('');
          $('#catClicks').val('');
        } else if (catClicks.length > 0 && isNaN(parseInt(catClicks))){
          $('#catClicks').parent().append('<span style="color:red">Please enter a number in the "clicks" field</span>');
        } else {
          $('#catClicks').parent().find('span').remove();
          app.updateKitten(currentKitten, catName, parseInt(catClicks));
          view.updateView(kittenList, currentKitten);
          $('#catName').val('');
          $('#catClicks').val('');
        }
      });

      $('#add-new-submit').on('click', function(event){
        event.preventDefault();
        app.createNewKitten($('#newName').val());
        view.updateView(kittenList);
      });

      $('#delete-submit').on('click', function(event){

      })
    },
    renderMain: function(kittenList, currentKitten){
      return kittenList.map(function(kitten){
        if(kitten.id === currentKitten){
          return (
            `<div class="cat-details" id="${kitten.id}">
                <h2>${kitten.name}</h2>
                <img src="images/${kitten.imgUrl}" alt="${kitten.alt}">
                <h2>${kitten.name} clicked ${kitten.counter} times.</h2>
            </div> `
          )
        } 
      });
    },
    renderSideBar: function(kittenList){
      return kittenList.map(function(kitten){
        return `<li id="${kitten.id}">${kitten.name}</li>`;
      });
    },
    updateView: function(kittenList, currentKitten){
      $('.cat-main-view').empty().append(view.renderMain(kittenList, currentKitten));
      $('.cat-nav').empty().append(view.renderSideBar(kittenList));
    }
  }
  const app = {
    init: function(){
      view.init(this.getAllKittens());
    },
    getAllKittens: function(){
      return model.kittens;
    },
    getCurrentKitten: function(){
      return $('.cat-details').attr('id');
    },
    getClickedKitten: function(event){
        const clickedKitten = $(event.target).attr('id');
        view.updateView(model.kittens, clickedKitten);
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
      console.log(newKitten)
      view.updateView(model.kittens, newKitten);
    },
    deleteKitten(){
      //TODO
    },
    incrementCounter: function(){
      model.kittens.forEach(function(kitten){
        if(app.getCurrentKitten() === kitten.id){
          kitten.counter++;
        }
      });
      view.updateView(model.kittens, app.getCurrentKitten());
    }
  }
  app.init();
})();
