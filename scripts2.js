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
            new Kitten("Lester", "cute-kitten5.jpg")
        ],
        createNewKitten: function(name, imgUrl){
            kittens.push(new Kitten(name, imgUrl));
        }
    }

    const view = {
        render: function(kitten){
            const template = `
            <div class="kitten-container" id="${kitten.id}">
                <h2>${kitten.name}</h2>
                <img src="images/${kitten.imgUrl}" alt="${kitten.alt}">
                <div>${kitten.name} clicked ${kitten.counter} times.</div>
            </div> `
            return template 
        },
        init: function(kittenList){
            const sideBar = kittenList.map(function(kitten){
                return `<li>${kitten.name}</li>`;
            });
            
            $('.cat-list').append(sideBar);
            $('.cat-detail').append(view.render(kittenList[0]));   

            $('.container').on("click", ".kitten-container img", function(event){
                let currentKitten = $(this).parent().attr("id");

                kittenList.forEach(function(kitten){
                    if (kitten.id === currentKitten){
                        controller.incrementCounter(kitten.id);
                        $(event.target).parent().find('div').html(`${kitten.name} clicked ${kitten.counter} times.`);
                    }
                });
            });
        
            $('.container').on("click", ".cat-list li", function(event){
                let currentKitten = $(this).html().toLowerCase();
        
                kittenList.forEach(function(kitten){
                    if (kitten.id === currentKitten){
                        $('.cat-detail').empty();
                        $('.cat-detail').append(view.render(kitten));
                    }    
                });
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
