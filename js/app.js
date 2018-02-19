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

      $('#app').on('click', '.cat-details img', app.incrementCounter);
      $('#app').on('click', '.cat-nav li', app.getClickedKitten);

      //toggle forms open and shut
      $('.toggle-btn').on("click", function(event){
        if($(event.target).hasClass('toggle-update-form')){
          $('.update-form').toggle(); 
        } else if($(event.target).hasClass('toggle-add-form')){
          $('.add-form').toggle();
        }
      });
      // update current kitten
      $('#update').on('click', function(event){
        app.updateKitten(event);
      });

      // add a new kitten 
      $('#add-new').on('click', function(event){
        app.createNewKitten(event);
      });

      $('#delete').on('click', app.deleteKitten);
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
    getKittenId: function(){
      return $('.cat-details').attr('id');
    },
    getClickedKitten: function(event){
        const clickedKitten = $(event.target).attr('id');
        view.updateView(model.kittens, clickedKitten);
    },
    createNewKitten: function(event, imgUrl){
      event.preventDefault();
      let name = $('#newName').val();
      model.kittens.push(new Kitten(name, imgUrl));
      view.updateView(model.kittens, app.getKittenId());
    },
    updateKitten: function(event){
      event.preventDefault();
      let newKitten = '';
      let kittenId = app.getKittenId();
      let name = $('#catName').val();
      let clicks =  $('#catClicks').val();

      model.kittens.forEach(function(kitten){
        if(kittenId === kitten.id){
          kitten.id = name.toLowerCase();
          kitten.name = name; 
          kitten.counter = clicks;
          kitten.alt = `A kitten named ${kitten.name}.`;
          newKitten += kitten.id;
        }
      });
      view.updateView(model.kittens, newKitten);
    },
    deleteKitten(){
      let kittenId = app.getKittenId();
      model.kittens.forEach(function(kitten, index){
       
        if(kittenId === kitten.id){
          model.kittens.splice(index, 1)
        }
      })
      view.updateView(model.kittens, kittenId);
    },
    incrementCounter: function(){
      model.kittens.forEach(function(kitten){
        if(app.getKittenId() === kitten.id){
          kitten.counter++;
        }
      });
      view.updateView(model.kittens, app.getKittenId());
    }
  }
  app.init();
})();
