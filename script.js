setTimeout(() => {
    alert (` Суть игры очень простая. Эти карточки выкладываются на стол «рубашкой» вверх. Далее по очереди каждый игрок открывает две любые карточки, показывая их всем. Если на них изображены одинаковые рисунки, он забирает их себе, и вскрывает следующую пару.!!!`);
}, 1600);


const cards = document.querySelectorAll('.game__item');


let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0; 


function flipCard(e){ 
    let clickedCard = e.target; 

    if(clickedCard !== cardOne && !disableDeck){ 
        clickedCard.classList.add('flip');

        if(!cardOne){
            return cardOne = clickedCard; 
        }
        cardTwo = clickedCard;

        disableDeck = true;

        let cardOneImg = cardOne.querySelector('img').src, 
            cardTwoImg = cardTwo.querySelector('img').src; 
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2){ 

    if (img1 === img2){ 
        matchedCard++; 
        if (matchedCard == 8){ 

            setTimeout(() => { 
                return shuffleCard();
            }, 1200); 
        }

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        return disableDeck = false;
    }
    else{
        setTimeout(() => { 
            cardOne.classList.add('shake');
            cardTwo.classList.add('shake');
        }, 400);

        setTimeout(() => { 
            cardOne.classList.remove('shake', 'flip');
            cardTwo.classList.remove('shake', 'flip');
            cardOne = cardTwo = '';

            disableDeck = false;

        }, 1200);
    }
}

function shuffleCard(){
    matchedCard = 0;
    cardOne = cardTwo = "";

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; 
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => { 
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);

        let imgTag = card.querySelector('img');
        imgTag.src = `images/img-${arr[index]}.jpg`;
    });
}
shuffleCard();

cards.forEach(card => { 
    card.addEventListener('click', flipCard); 
});