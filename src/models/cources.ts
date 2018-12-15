//type TestRecord=any;


class Answer
{
    public id:number;
    public answer:string;

}


class Question
{
    public id:number;
    public question:string;
    public answers:Array<Answer>;
    public good_answ:number;
}

class TestRecord 
{
    public id:number;
    public title:string;
    public exec_time_min:number;
    public questions:Array<Question>;
    constructor() {}
}

class  Testes
{
    
    constructor() {}

    public TestesList:Array<TestRecord>=[];
}

class QuestionResult
{
    public id:number;
    public question:string;
    public answer_good:string;
    public answer_user:string;
    
    public get IsRight() : boolean { return  (this.answer_good==this.answer_user);   };
    
}

export { Testes,TestRecord, Question, Answer, QuestionResult }