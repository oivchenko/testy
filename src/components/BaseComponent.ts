import { Vue,Inject,Component,Watch } from 'vue-property-decorator';
import { TestState,Answer,TestRecord,Testes, QuestionResult } from '../models';

@Component({

    data(){  
    
        return { 
            alltests: (this as BaseComponent).testes,
            timeleft: (this as BaseComponent).teststate.TimeLeftString,
            curtest: (this as BaseComponent).teststate.CurrentTest,
            testresults: (this as BaseComponent).teststate.GetTestResults()
        
        }; 

    }


})
export default class BaseComponent extends Vue
{
    @Inject() testes:Testes;
    @Inject() teststate:TestState;


    public get title() : string {   return  this.teststate.Title; }
    public get question() : string {   return  this.teststate.Question; }
    public get question_num() : number {   return  this.teststate.CurrentQuestion; }
    public get question_cnt() : number {   return  this.teststate.Questions_Cnt  /* CurrentTest.questions.length*/ ; }
    public get answers() : Answer[] {   return  this.teststate.Answers; }
    public get good_answ() : number {   return  this.teststate.GoodAnswer; }
    public get sel_answ() : number {   return  this.teststate.SelectedAnswer; }
    public get cur_answer() : string {   return  this.teststate.CurrentAnswer; }

    public get enable2result() : boolean {   return  this.teststate.enable2results; }


    public settest(test:TestRecord):void  { this.teststate.CurrentTest=test; }

    public start():void{  this.teststate.StartTest(); }
    public cancel():void{  this.teststate.CancelTest(); }

    public prev():void{ this.teststate.Prev();}
    public next():void{ this.teststate.Next();}
    public selectAnswer(item:Answer):void { this.teststate.SelectAnswer(item.id); }

    public get testisrunning():boolean { return this.teststate.TestIsRunning;}

    public setTO2_10s():void{ this.teststate.SetTO2_10s();}


    public ToResultsPage():void{ this.teststate.Enter2ResultsPage();}
    public Back2Test():void{ this.teststate.FromResultsPageBackToTest();}
}