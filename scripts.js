(function(){
    //Create kittens 
    function Kitten(name, imgUrl){
        this.name = name;
        this.counter = 0;
        this.imgUrl = imgUrl || "cute-kitten1.jpg"; 
        this.alt = `A kitten named ${this.name}.`;
    }

    const kittens = [
        new Kitten("Barty"), 
        new Kitten("Greta", "cute-kitten2.jpg"), 
        new Kitten("Sam", "cute-kitten3.jpg")
    ];

    //display kittens
    const kittenTemplate = kittens.map(function(kitten){
        const kittyID = kitten.name.toLowerCase();
        const kitty = `
        <div class="kitten-container" id="${kittyID}">
            <h2>${kitten.name}</h2>
            <img src="images/${kitten.imgUrl}" alt="${kitten.alt}">
            <div>${kitten.name} clicked ${kitten.counter} times.</div>
        </div>
        `
        return kitty
    });

    $('.container').append(kittenTemplate);

    //count kittens
    function incrementCounter(kitten){
        kitten.counter = kitten.counter + 1;
    }
    $('.container').on("click", ".kitten-container img", function(event){
        const currentKitten = $(this).parent().attr("id");
        
        kittens.forEach(function(kitten){
            if (kitten.name.toLowerCase() === currentKitten){
                incrementCounter(kitten);
                $(event.target).next().html(`${kitten.name} clicked ${kitten.counter} times.`);
            }
        });
    });
})();