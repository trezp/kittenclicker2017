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
      $('.cat-list').append(this.renderSideBar(kittenList));
      $('.cat-detail').append(this.renderMain(kittenList[0]));   
      
      //kitten counter 
      $('.container-main').on("click", ".container-cat img", function(){
        const currentKitten = $(this).parent().attr('id');  
        controller.incrementCounter(currentKitten);
        view.updateView(kittenList, currentKitten);
      });

      //sidebar
      $('.container-main').on("click", ".cat-list li", function(){
        const currentKitten = $(this).attr('id');
        view.updateView(kittenList, currentKitten);
      });

      //toggle change cat form
      $('#adminToggle').on("click", function(){
        $(this).toggleClass("active-button");
        $('.cat-admin').toggle();
      });

      //toggle new cat form
      $('#newCatToggle').on("click", function(){
        $(this).toggleClass("active-button");
        $('.cat-new').toggle();
      });

      //handle change cat form ***REALLY NEEDS REFACTOR***
      $('#submit').on('click', function(event){
        event.preventDefault();

        const currentKitten = $('.container-cat').attr('id');
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

      $('#newSubmit').on('click', function(event){
        event.preventDefault();
        controller.createNewKitten($('#newName').val());
        view.updateView(kittenList, null);
      });

      $('#delete').on('click', function(event){

      })
    },
    renderMain: function(kitten){
      return (
        `<div class="container-cat" id="${kitten.id}">
            <h2>${kitten.name}</h2>
            <img src="images/${kitten.imgUrl}" alt="${kitten.alt}">
            <div>${kitten.name} clicked ${kitten.counter} times.</div>
        </div> `
      )
    },
    renderSideBar: function(kittenList){
      return kittenList.map(function(kitten){
        return `<li id="${kitten.id}">${kitten.name}</li>`;
      });
    },
    updateView: function(kittenList, currentKitten){
      $('.cat-list').empty();
      $('.cat-list').append(view.renderSideBar(kittenList));
      kittenList.forEach(function(kitten){
        if (kitten.id === currentKitten){
          $('.cat-detail').empty();
          $('.cat-detail').append(view.renderMain(kitten)); 
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
