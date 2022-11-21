import { moduleSimplexTable } from "./simplexTable";


export class Matrix {
    private matrix:Array<Array<number>>
    private result:Object ;

   
    public createMatrix(countX: number) {
    
        this.matrix = [];
        for (let index = 0; index < countX+1; index++) {
            this.matrix[index] = [];
        }
        console.log("CREATE",this.matrix)
    }
    public fillMatrix(dataLimLeft: Array<number>, dataLimRight: Array<number>, dataSymbol:Array<number>, countX: number,countLimitation:number,arrayMainFunction:Array<number>) {
        let _countGoal = countX;
        let indexMatrix = 0;
        console.log(dataLimLeft)
        dataLimLeft.forEach((item, index) => {
            if (_countGoal === index) {
                indexMatrix++;
                _countGoal += countX;
            }
            console.log(`  ${index}  === ${_countGoal} `)
            this.matrix[indexMatrix].push(item);
        });
        dataLimRight.forEach((item,index)=>{
            this.matrix[index].push(item)
        })
    
        for (let i = 0; i < countLimitation; i++) {
            for (let j = 0; j < countX+1; j++) {
                console.log(`${  this.matrix[i][j]} * ${dataSymbol[i]}`)
                this.matrix[i][j] =  this.matrix[i][j]*dataSymbol[i] 
            
            }
            
        }
        
        //MAIN
      this.result = moduleSimplexTable(this.matrix,arrayMainFunction,countX,countLimitation,document.querySelector(".tables_simplex_table"),document.querySelector(".variables_simplex_table"))
        //TEST
        // arrayMainFunction = [1, 2, 2, 3, 0]
        // this.matrix = [
        //     [-1, -12, -12, -2, -21],
        //     [-10, -1, -0, -4, -33],
        //     [-2, -7, -3, -0, -12],
        //     [2, 7, 3, 0, 65],
        //     [-3, -0, -4, -6, -34]]

        // this.result = moduleSimplexTable(this.matrix,arrayMainFunction,countX,countLimitation,document.querySelector(".tables_simplex_table"),document.querySelector(".variables_simplex_table"))
    
        // /.result_simplex_table
    //	console.log(matrix,arrayMainFunction);
    return {
        matrix:this.matrix,
        mainFunction:arrayMainFunction
    };
    }
    public getMatrix(){
        return this.matrix
    }
    public getResultData(){
        console.log(this.result)
        return this.result
    }
}