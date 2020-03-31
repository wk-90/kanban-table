$(function() {

// Auxiliary functions
function randomString() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var str = '';
    for (i = 0; i < 10; i++ ) {
        str += chars[Math.floor(Math.random() * chars.length)];
        
     }
     return str
    
}

function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
    }).disableSelection()
}


// Class COLUMN
class Column {
    constructor(name,color){
        var self = this;
        
        this.id = randomString();
        this.name = name || 'Draft';
        this.color = color || 'gray';
        this.$element = createColumn();

        function createColumn() {
            // Creating column elements
            var $column = $('<div class="column"></div>');
            $column.addClass( 'column--' + self.color );
            var $columnTitle = $('<h2 class="column-title">' + self.name.toUpperCase() + '</h2>');
            var $columnCardList = $('<ul class="column-card-list"></ul>');
            var $columnDelete = $('<button class="column-btn-delete">x</button>');
            var $columnAddCard = $('<a class="add-card">Dodaj kartę </a>');
            var $btnAddCard = $('<button class="btn-add">+</button>');

            // Variable contains 'select' element
            var $checkbox = $('<div class="custom-select" style="width:200px;"> <select class="list"> <option value="0">Wybierz kolor:</option> <option value="1">Szary</option><option value="2">Zielony</option> <option value="3">Niebieski</option></select> </div>');

   
            
            //Delete column after click
            $columnDelete.click(function(){
                self.removeColumn()
            })
            //Add card after click
            $btnAddCard.click(function(){
                self.addCard(new Card(prompt("Wpisz nazwę karty")))
            })
    
            //Creating colummn elements
            $column.append($columnTitle)
                    .append($checkbox)
                    .append($columnDelete)
                    .append($columnAddCard)
                    .append($btnAddCard)
                    .append($columnCardList)
                    ;

            //Hiding defined columns
            if(self.name==='Do zrobienia' || self.name==='W trakcie' || self.name==='Skończone') {
                $checkbox.hide();
                $columnDelete.hide();
            }

            // Column color choosing - based on choosen value from 'select' field
            $checkbox.click(function(){
                $('.list').change(function(){
                    var getval = $(this).val();
                                            
                    if(getval==1){
                        $column.removeClass('column--green');
                        $column.removeClass('column--blue');
                        $column.addClass('column--gray');
                    }else if(getval==2) {                        
                        $column.removeClass('column--gray');
                        $column.removeClass('column--blue');
                        $column.addClass('column--green');
                        
                    } else if (getval==3){                       
                        $column.removeClass('column--gray');
                        $column.removeClass('column--green');
                        $column.addClass('column--blue');
                    }

                    $checkbox.hide();                    
                })               
            })
                          
            //Returning created column
            return $column;  
        }       
    }
   
    //CLASS METHODS
    addCard(card) {
            this.$element.children('ul').append(card.$element);
            
        }

    removeColumn() {
        this.$element.remove();
    }
  
}

// Class CARD
class Card{
    constructor(description){
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            // Creating card elements
            var $card = $('<li class=card></li>');
            var $cardDescription = $('<p class="card-description"></p>');
            var $cardDelete = $('<button class="btn-delete">x</button>');
    
    
            // Card deleting
            $cardDelete.click(function(){
                self.removeCard()
            })
    
            // Card Creating
            $card.append($cardDelete);
            $cardDescription.text(self.description);
            $card.append($cardDescription)

            // Returning created card
            return $card
        }
    
    }
    // CLASS Method
    removeCard() {
        this.$element.remove();
    }

}

// Kanban table Object
var board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
        
    },
    
    $element: $('#board .column-container')
}

// Method for create a new column - linked to 'board' object
$('.create-column').click(function(){
    var name = prompt('Wpisz nazwę kolumny');
    var column = new Column(name);
    board.addColumn(column);
   
})



// CREATING A NEW EXAMPLES OF COLUMN
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie', 'green');
var doneColumn = new Column('Skończone', 'blue' );

// ADDING NEW COLUMNS TO THE TABLE
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);


// CREATING NEW EXAMPLES OF CARDS
var card1 = new Card('task 1');
var card2 = new Card('task 2');
var card3 = new Card('task 3');


// ADDING CARDS TO COLUMN
todoColumn.addCard(card1);
doingColumn.addCard(card2);
doneColumn.addCard(card3);


})

