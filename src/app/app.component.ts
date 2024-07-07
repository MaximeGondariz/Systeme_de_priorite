import { Component } from '@angular/core';
import { Character } from './models';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Systeme_de_priorite';

  arrayCharacters: Array<Character> = [
    {
      name: "name1",
      class: "barbarian",
      priority: 5,
      actions: []
    },
    {
      name: "name2",
      class: "barde",
      priority: 5,
      actions: []
    },
    {
      name: "name3",
      class: "cleric",
      priority: 5,
      actions: []
    },
    {
      name: "name4",
      class: "paladin",
      priority: 5,
      actions: []
    },
  ];

  //Base priority depending on the class. Used as a filter
  classPriority3: Array<string> = ['rogue']
  classPriority4: Array<string> = ['ranger']
  classPriority5: Array<string> = ['artificer', 'bard', 'cleric', 'druid', 'monk', 'sorcerer', 'warlock', 'wizard']
  classPriority6: Array<string> = ['fighter', 'paladin']
  classPriority7: Array<string> = ['barbarian']

  ngOnInit(){
    this.arrayCharacters.forEach(character => {
      character.priority = this.putBasePriority(character.class);
    });
  }

  putBasePriority(className: string): number{
    if(this.classPriority3.includes(className)){
      return 3
    }else{
      if(this.classPriority4.includes(className)){
        return 4
      }else{
        if(this.classPriority6.includes(className)){
          return 6
        }else{
          if(this.classPriority7.includes(className)){
            return 7
          }else{
            return 5
          }
        }
      }
    }
  }

  addAction(id: number){
    let select = <HTMLSelectElement>document.getElementById('action'+id)
    this.arrayCharacters[id].actions.push(select.value);
  }

  changePriority(id: number){
    let value = this.actionToValue(this.arrayCharacters[id].actions);
    this.arrayCharacters[id].priority += value;
    if(this.arrayCharacters[id].priority < 0) this.arrayCharacters[id].priority = 0;
    this.arrayCharacters[id].actions = [];
  }

  actionToValue(actions:Array<string>){
    let value = 0
    actions.forEach(action => {
      if(action === "attack"){
        value += 1;
      }
      if(action === "follow-up attack" || action === "bonus attack"){
        value += 0.5
      }
      if(action === "sneak attack" || action === "invisibility in-sight"){
        value += 0.5
      }
      if(action === "invisibility out-of-sight"){
        value += -2
      }
      if(action === "hide"){
        value += -3
      }
    })
    return value
  }
}
