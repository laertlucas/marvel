class MARVELapi {
    constructor() {
      this.apiUrl = "https://gateway.marvel.com:443/v1/public/characters";
      this.elements = {
        form: $("#marvel-form"),
        input: $("#search-input")
      };
      this.registerEvents();
    }
  
    registerEvents() {
      this.elements.form.on("submit", (e) => {
        e.preventDefault();
        this.getCharacterName(this.elements.input.val().trim(), (data) => {this.callback(data)} );
      });
    }
  
    getCharacterName(name, callback) {
      let url = this.apiUrl;
      let params = {
        'nameStartsWith' : name ,
        'limit' : 10,
        'offset' : 0,
        'apikey' : 'e092564c1b351a44e048566a0317a926'
      };
      
      $.getJSON(url, params)
        .done(data => { 
          this.callback(data)
          this.showResults(data)
        })
      
        .fail(response => {
          this.callback(null)
          this.showError()
        });
    }
     
    callback(data) {
      if (typeof data !== 'undefined' ||typeof data !== null) {
        return true;
      }
      
      else if (typeof data === 'undefined' ||typeof data === null) {
        return false;
      }
    }
    
    showResults(data) {
       $('#results').removeClass('hidden')
       $('#results').html('')
       $('#errorTxt').html('')
       $('#errorTxt').addClass('hidden')
      
      data.data.results.forEach( (item) => {
       $('#results').append(`
            <div class="text-center my-5">
               <h4 class="">${item.name}</h4><br>
               <img class="col-6" src="${item.thumbnail.path}.${item.thumbnail.extension}" ><br><br>
               <h5 class="">Description :</h5>
               <p class="">${item.description}</p><br>
            </div>
       `);
      })
    }
    
    showError() {
      $('#results').addClass('hidden')
      $('#errorTxt').removeClass('hidden')
      $('#results').html('')
      
      $('#errorTxt').append('<h3>ERROR : invalid input !!</h3>')
  
    }
    
  }  
  
  new MARVELapi();

  $('#results').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  });
  