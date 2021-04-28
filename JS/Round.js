import {Bank} from './Bank.js'
import {CardDeck} from './CardDeck.js'
import { Game } from './GameClass.js'
import {main} from './game.js'
import {Player} from './Player.js'

export class Round {
    constructor(players, cardDeckSize){
        this.players = players;
        this.bank = new Bank();
        this.cardDeck = new CardDeck(cardDeckSize)
        this.BET = 5;
    }

    initializeRound(){
        // Create EventListener
        document.getElementById('new-round').addEventListener('click', (event) => {
            event.preventDefault()
            main()
        })
        this.players.forEach( (player) => {
            if(document.getElementById(`player${player.id}-new-card`)) {
                document.getElementById(`player${player.id}-new-card`).addEventListener("click", (event) => {
                    event.preventDefault()
                    this.addNewCard(player)
                })
            }
            if(document.getElementById(`player${player.id}-bet`)) {
                document.getElementById(`player${player.id}-bet`).addEventListener("click", (event) => {
                    event.preventDefault()
                    player.betMoney(player.bet)
                })
            }
            if(document.getElementById(`player${player.id}-done`)) {
                document.getElementById(`player${player.id}-done`).addEventListener("click", (event) => {
                    event.preventDefault()
                    document.getElementById(`player${player.getId()}-done`).disabled = true
                    player.isDone = true
                })
            }
            // initialize players
            player.isDone = false
            player.hasBet = false
            player.isPlaying = true
            this.clearCards()
            document.getElementById(`player${player.getId()}-name`).innerHTML = player.getName()
            document.getElementById(`player${player.getId()}-money`).innerHTML = player.getMoney() + "$"
            player.setPlayerBorderRed(false)
        })
        let elementsNewCard = document.getElementsByClassName("new-card")
        for (let el of elementsNewCard) {
            el.disabled = true
        }
        let elementsBet = document.getElementsByClassName("bet")
        for (let el of elementsBet) {
            el.disabled = false
        }
        let elementsDone = document.getElementsByClassName("done")
        for (let el of elementsDone) {
            el.disabled = false
        }
        console.log(`round initialized`)
    }

    drawPlayerCards(player){
        if(document.getElementById(`player${player.getId()}-cards`)){
            document.getElementById(`player${player.getId()}-cards`).innerHTML = player.cards.reduce((acc, i) => acc + i.image, "")
            document.getElementById(`player${player.getId()}-score`).innerHTML = player.calculateScore()
        }
    }

    drawBankCards(){
        document.getElementById('bank-cards').innerHTML = this.bank.cards.reduce((acc, i) => acc + i.image, "")
        document.getElementById(`bank-score`).innerHTML = bank.calculateScore()
    }

    addNewCard(player){
        let newCard = this.cardDeck.getCard()
        player.cards.push(newCard)
        this.drawPlayerCards(player)
        console.log(`card added for player${player.getId()} and value is ${newCard.value}`)
        if(player.getCardValue()>21) {
            this.players.pop(player)
            player.endRound()
        }
    }

    clearCards(){
        this.players.forEach( player => {
            player.cards.length = 0
            this.drawPlayerCards(player)
        })
        bank.cards.length = 0
        this.drawBankCards()
    }
}
