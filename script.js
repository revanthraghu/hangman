var categories = ['mov', 'tv', 'ppl', 'cnt', 'rndm']

function changeSelection(selected) {
    categories.forEach(function(category) {
        document.getElementById(category).style.backgroundColor = "#B2DFDB"
        document.getElementById(category).style.fontWeight = "normal"
        document.getElementById(category).name = ''
    })
    selected.style.backgroundColor = "#26A69A"
    selected.name = "clicked"
    selected.style.fontWeight = "bold"
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
var answer = []
function generateDivs(phrase) {
    phrase = phrase.split('')
    answer = phrase
    //prints the randomly generated phrase
    console.log(answer)
    if(document.getElementById('answer').querySelectorAll('div').length !== 0) { 
        var num_of_divs = document.getElementById('answer').querySelectorAll('div').length 
        var list_of_divs = document.getElementById('answer').querySelectorAll('div')
        for(var div = 0; div < num_of_divs; div++) {
            list_of_divs[div].remove()                        
        }    
    }
    phrase.forEach(function(letter) {
        var div = document.createElement('div')
        div.textContent = letter
        div.setAttribute('name', letter)
        if(letter !== ' ') {
            //the font-size is set to zero to hide the letter in div 
            div.setAttribute('style', 'border-bottom: 3px solid black; margin-bottom: 10px; font-size: 0px; min-height: 30px')
        }
        document.getElementById("answer").append(div)
    })
}

function resetGame() {
    var current_img = document.getElementById('hangman_img')
    current_img.setAttribute('src', 'resources/hangman_initial.png')
    chance_count = 0
    selected_letters = []
    for(var alphabet = 0; alphabet < 26; alphabet++) {
        var letter = document.getElementById('alphabets').querySelectorAll('div')[alphabet]
        letter.name = ''
        letter.style.backgroundColor = "#B2DFDB"
        letter.style.fontWeight = "normal"
        letter.addEventListener('click', selectLetter)
    }
}

function loadPhrase() {
    resetGame()
    var selected = document.getElementsByName('clicked')
    if(selected[0] === undefined) {
        selected = event.target
    } else {
        selected = selected[0]
    }
    changeSelection(selected)
    var category_items = {'mov': ['joker', 'once upon a time in hollywood', 'frozen', 'knives out', 'ford vs ferrari'],
                          'tv': ['black mirror', 'game of thrones', 'sherlock', 'modern family', 'peaky blinders', 'the big bang theory'],
                          'ppl': ['micheal jackson', 'bill gates', 'steve jobs', 'sachin tendulkar', 'roger federer', 'tiger woods', 'charles darwin', 'socrates', 'plato', 'aristotle', 'shah rukh khan'],
                          'cnt': ['india', 'pakistan', 'nepal', 'sri lanka', 'china', 'vietnam', 'indonesia', 'singapore', 'south korea', 'north korea', 'malaysia', 'afghanistan']
                        }
    if(selected.id !=='rndm' && selected.name === 'clicked') {

        var phrase = category_items[selected.id][getRandomInt(category_items[selected.id].length)]

    } else {

        var rndm_category = Object.keys(category_items)[getRandomInt(Object.keys(category_items).length)]
        var phrase = category_items[rndm_category][getRandomInt(category_items[rndm_category].length)]

    }
    generateDivs(phrase)
}

var selected_letters = []
function checkProgress() {
    var ans = answer.map(function(ele){
        if(ele === ' ') {
            return ''
        } else {
            return ele
        }
    })
    ans = ans.join('')
    if(ans.length === selected_letters.length) {
        var current_img = document.getElementById('hangman_img')
        switch (chance_count) {
            case 0:
                current_img.setAttribute('src', 'resources/hangman_win_1.png')
                break;
            case 1:
                current_img.setAttribute('src', 'resources/hangman_win_2.png')
                break;
            case 2:
                current_img.setAttribute('src', 'resources/hangman_win_3.png')
                break;
            case 3:
                current_img.setAttribute('src', 'resources/hangman_win_4.png')
                break;
            case 4:
                current_img.setAttribute('src', 'resources/hangman_win_5.png')
                break;
            case 5:
                current_img.setAttribute('src', 'resources/hangman_win_6.png')
                break;
            default:
                break;
        }
        
        for(var alphabet = 0; alphabet < 26; alphabet++) {
            document.getElementById('alphabets').querySelectorAll('div')[alphabet].removeEventListener('click', selectLetter)
        }
    }
}

//Function to reveal letter when selected letter is present in phrase
var chance_count = 0
function selectLetter() {
    if(event.target.name !== 'selected' && chance_count < 6 && answer.length !== 0) {
        var letter_selected = event.target.textContent.toLowerCase()
        var letter_found = false
        var img_urls = ['hangman_1.png', 'hangman_2.png', 'hangman_3.png', 'hangman_4.png', 'hangman_5.png', 'hangman_game_over.png']
        event.target.id = letter_selected
        event.target.name = 'selected'
        event.target.style.backgroundColor = '#004D40'
        for(var letter = 0; letter < answer.length; letter++) {
            if(answer[letter] === letter_selected) {
                for(var ele = 0; ele < document.getElementsByName(letter_selected).length; ele++) {
                    document.getElementsByName(letter_selected)[ele].style.fontSize = 'x-large'                        
                }
                selected_letters.push(letter_selected)
                letter_found = true
                break;
            } 
        }
        if(letter_found === false) {
            var current_img = document.getElementById('hangman_img')
            if(chance_count <= 5) {
                current_img.setAttribute('src', 'resources/' + img_urls[chance_count])
            } else {
                for(var alphabet = 0; alphabet < 26; alphabet++) {
                    document.getElementById('alphabets').querySelectorAll('div')[alphabet].removeEventListener('click', selectLetter)
                }
            }
            chance_count++
        }
    checkProgress()
    }
}

categories.forEach(function (category) {
    document.getElementById(category).addEventListener('mouseover', function addHighlight(event){
        if(event.target.name !== 'clicked') {
            event.target.style.backgroundColor = "#80CBC4"
            event.target.style.fontWeight = "bold"
        }
    })
    document.getElementById(category).addEventListener('mouseleave', function removeHighlight(event) {
        if(event.target.name !== 'clicked') {
            event.target.style.backgroundColor = "#B2DFDB"
            event.target.style.fontWeight = "normal"
        }
    })
    document.getElementById(category).addEventListener('click', loadPhrase)
})
for(var alphabet = 0; alphabet < document.getElementById('alphabets').querySelectorAll('div').length; alphabet++) {
    document.getElementById('alphabets').querySelectorAll('div')[alphabet].addEventListener('mouseover', function addHighlight(event){
        if(event.target.name !== 'selected') {
            event.target.style.backgroundColor = "#80CBC4"
            event.target.style.fontWeight = "bold"
        }
    })
    document.getElementById('alphabets').querySelectorAll('div')[alphabet].addEventListener('mouseleave', function removeHighlight(event) {
        if(event.target.name !== 'selected') {
            event.target.style.backgroundColor = "#B2DFDB"
            event.target.style.fontWeight = "normal"
        }
    })
    document.getElementById('alphabets').querySelectorAll('div')[alphabet].addEventListener('click', selectLetter)
}
