import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatePointsService {

  constructor() { }

  calculatePoints(solution, response, points){
    return new Promise<number>((resolve,reject)=>{
      if(solution[0] == response[0] && solution[1] == response[1]){
        resolve(points)
      }else if(this.isAdjacent(solution, response)){
        resolve(points*0.5)
      }else{
        resolve(0)
      }
    })
  }

  isAdjacent(solution, response){
    if ((response[0] >= solution[0]-1 && response[0] <= solution[0]+1) &&
         response[1] >= solution[1]-1 && response[1] <= solution[1]+1) {
        return true;
    }else{
      return false;
    }
  }
}
