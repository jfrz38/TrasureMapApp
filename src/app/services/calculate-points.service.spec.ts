import { TestBed } from '@angular/core/testing';

import { CalculatePointsService } from './calculate-points.service';

let service : CalculatePointsService; 

describe('CalculatePointsService', () => {

  beforeEach(() => { 
    service = new CalculatePointsService(); 
  });

  it('should be created', () => {
    const service: CalculatePointsService = TestBed.get(CalculatePointsService);
    expect(service).toBeTruthy();
  });

  
  it('calculate 100% points',async ()=>{
    expect(await service.calculatePoints([4,4],[4,4],10)).toEqual(10)
    expect(await service.calculatePoints([7,8],[7,8],20)).toEqual(20)
    expect(await service.calculatePoints([80,10],[80,10],-4)).toEqual(-4)
    expect(await service.calculatePoints([0,-10],[0,-10],43210789)).toEqual(43210789)
  })

  it('calculate 50% points',async ()=>{
    expect(await service.calculatePoints([4,4],[4,3],10)).toEqual(5)
    expect(await service.calculatePoints([7,8],[6,8],56)).toEqual(28)
    expect(await service.calculatePoints([80,10],[81,11],-10)).toEqual(-5)
    expect(await service.calculatePoints([0,-10],[-1,-11],3)).toEqual(1.5)
  })

  it('calculate 0% points', async ()=>{
    expect(await service.calculatePoints([4,4],[2,3],10)).toEqual(0)
    expect(await service.calculatePoints([7,8],[9,8],7487)).toEqual(0)
    expect(await service.calculatePoints([80,10],[81,12],-3)).toEqual(0)
    expect(await service.calculatePoints([0,-10],[0,-11],0)).toEqual(0)
  })
});

describe('Check adjacent',()=>{

  beforeEach(() => { 
    service = new CalculatePointsService(); 
  });

  it('should be adjacent:',()=>{
    expect(service.isAdjacent([1,1],[0,2])).toBeTruthy()
    expect(service.isAdjacent([1,1],[1,2])).toBeTruthy()
    expect(service.isAdjacent([1,1],[2,2])).toBeTruthy()
    expect(service.isAdjacent([1,1],[2,1])).toBeTruthy()
    expect(service.isAdjacent([1,1],[2,0])).toBeTruthy()
    expect(service.isAdjacent([1,1],[1,0])).toBeTruthy()
    expect(service.isAdjacent([1,1],[0,0])).toBeTruthy()
    expect(service.isAdjacent([1,1],[0,1])).toBeTruthy()
  })

  it('should not be adjacent:',()=>{
    expect(service.isAdjacent([4,4],[0,0])).toBeFalsy()
    expect(service.isAdjacent([4,4],[-10,8])).toBeFalsy()
    expect(service.isAdjacent([4,4],[4,6])).toBeFalsy()
    expect(service.isAdjacent([4,4],[2,4])).toBeFalsy()
    expect(service.isAdjacent([4,4],[5,0])).toBeFalsy()
  })
})
