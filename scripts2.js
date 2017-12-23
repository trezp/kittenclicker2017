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
      
      $('.container-main').on("click", ".container-cat img", function(){
        const currentKitten = $(this).parent().attr('id');  
        controller.incrementCounter(currentKitten);
        view.updateView(kittenList, currentKitten);
      });

      $('.container-main').on("click", ".cat-list li", function(){
        const currentKitten = $(this).attr('id');
        view.updateView(kittenList, currentKitten);
      });

      $('#adminToggle').on("click", function(){
        $(this).html() === 'Admin Off' ? 
          $(this).html("Admin On") : $(this).html("Admin Off");

        $(this).toggleClass("admin-on");
        $('.cat-admin').toggle();
      });

      $('#submit').on('click', function(event){
        event.preventDefault();
        const currentKitten = $('.container-cat').attr('id');
        const catName = $('#catName').val();
        const catClicks = parseInt($('#catClicks').val());
        controller.updateKitten(currentKitten, catName, catClicks);
        view.updateView(kittenList, currentKitten);
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
      model.kittens.forEach(function(kitten){
        if(kittenId === kitten.id){
          kitten.name = name; 
          kitten.counter = clicks;
        }
      });
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
