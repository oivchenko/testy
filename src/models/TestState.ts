import { Answer,TestRecord,QuestionResult } from './cources';

class TestState {

    constructor() {}

//    private _ischanged: boolean=false;
   
//    public get IsChanged() : boolean {  return  this._ischanged;   }
    

private  _timeofstart:Date;
private  _timeofend:Date;


    private _choices:{[key:number]:number}=[];
    public get choices() : {[key:number]:number} {
        return  this._choices;
    }
    

    public get CurrentComponent() : string 
    {
//        return this._CurrentComponent; 

        if (this._CurrentTest==null)   return   'list-cources';
        if (this._CurrentQuestion==0)   return   'test-start';
        if ((this._CurrentQuestion>0) && (!this.TestIsRunning)) return 'test-results';
        if ((this.TestIsRunning)&& this._inResultsPage) return 'test-results';
        return  'test-doing';
    }
  



    private _CurrentTest:TestRecord=null;
  
    public set CurrentTest(v : TestRecord) { 
        this._CurrentTest = v; 
        this._CurrentQuestion=0; 
//        this.SetCurrentComponent();
    }
   
    public get CurrentTest() : TestRecord { return this._CurrentTest;  }
    

    private _CurrentQuestion:number=0;
    public get CurrentQuestion() : number { return this._CurrentQuestion;}
    

    
    public get enable2results() : boolean 
    { 
        return  (this._CurrentTest!=null)&&(this.Questions_Cnt==this._choices.length-1);
    }
    
    private _inResultsPage:boolean=false;
    public Enter2ResultsPage():void
    {
        this._inResultsPage=false;
        if (!this.enable2results)   return;
        this._inResultsPage=true;
    }

    public FromResultsPageBackToTest():void
    {
        if (!this.TestIsRunning)   return;
        this._inResultsPage=false;
    }




    public get Question() : string 
    {
        if (this._CurrentTest==null)    return  '';
        if (this._CurrentQuestion==0)   return  '';
        let _rez:string=this._CurrentTest.questions.find(_v=>_v.id==this._CurrentQuestion).question;
        return  _rez; 
    }

    
    
    public get Questions_Cnt() : number 
    {
        if (this._CurrentTest==null)    return  0;
        if (this._CurrentQuestion==0)   return  0;
        let _rez:number=this._CurrentTest.questions.length;
        return  _rez; 
    }




    public get GoodAnswer():number
    {
        if (this._CurrentTest==null)    return  0;
        if (this._CurrentQuestion==0)   return  0;
        let _rez:number=this._CurrentTest.questions.find(_v=>_v.id==this._CurrentQuestion).good_answ;
        return  _rez; 
    }

    
    
    public get SelectedAnswer():number
    {
        var _choice=this.choices[this.CurrentQuestion];
        if (_choice==undefined) return  0;
        return  _choice;
    }


    public get CurrentAnswer():string
    {
        var _choice=this.choices[this.CurrentQuestion];
        if (_choice==undefined) return  '';
        var _answ=this.Answers[_choice-1];
        if (_answ==undefined) return  '';
        return  _answ.answer;
    }


    public get Answers() : Answer[] {
        if (this._CurrentTest==null)    return  [];
        if (this._CurrentQuestion==0)   return  [];
        return  this._CurrentTest.questions[this._CurrentQuestion-1].answers;
    }
    
    public SelectAnswer(_id:number):void
    {
        this._choices[this.CurrentQuestion]=_id;
        this._choices=this._choices.map(t=>t);
    }


    public get Title() : string {
        if (this._CurrentTest==null)    return  "";
        return  this._CurrentTest.title;
    }
    

    public Next():void {
        if(this._CurrentTest==null) return;
        if(this.CurrentQuestion>=this._CurrentTest.questions.length)    return;
        this._CurrentQuestion++;
    }        

    public Prev():void {
        if(this._CurrentTest==null) return;
        if(this.CurrentQuestion<2)    return;
        this._CurrentQuestion--;
    }        
    

    public StartTest():void
    {
        if (this._CurrentTest==null)    return;
        this._CurrentQuestion=1;
        this._choices=[];

        let _start=new Date();
        let _min=_start.getMinutes();
        let _sec=_start.getSeconds();
        let _end=_start;
        _end.setSeconds(_sec);
        _end.setMinutes(_min+this._CurrentTest.exec_time_min);

        this._timeofstart=_start;
        this._timeofend=_end;

        this._handletimer=setInterval(() => { this._refresh(); }, 1000);

    }    
    

    private _handletimer:number;

    public TestIsRunning:boolean=false;

    private get _TestIsRunning() : boolean 
    {
        if (this._CurrentTest==null)    return  false;
        if (this._CurrentQuestion<1)    return  false;

        let _now=new Date();
        let _diff:number=this._timeofend-_now;
        if (_diff<1)    
        {
            clearInterval(this._handletimer);
            return  false;  
        }

        return  true;
    }

    
    public TimeLeftString:string='';

    private get _TimeLeftString() : string 
    {
        if (!this.TestIsRunning)    return 'stopping'; 
        let _now=new Date();
        let _diff:number=this._timeofend-_now;
        var _tdiff=new Date(_diff);
        let _min=_tdiff.getMinutes();
        let _sec=_tdiff.getSeconds();

        let _rez=(_min>0) ? `${_min} m  ${_sec} s` : `${_sec} s`;
        return  _rez;
    }
    

    private _refresh():void
    {
        this.TestIsRunning=this._TestIsRunning;
        this.TimeLeftString=this._TimeLeftString;
    }

    public SetTO2_10s():void
    { 
        if (!this.TestIsRunning)    return; 
        let _end=new Date();
        let _sec=_end.getSeconds();
        _end.setSeconds(_sec+11);
        this._timeofend=_end;
    }

    public CancelTest():void
    {
        this._CurrentTest=null;
        this._CurrentQuestion=0;
        this._inResultsPage=false;
        this._refresh();
    }  
    
    

    public GetTestResults():QuestionResult[]
    {
        if (this._CurrentTest==null)    return  [];
        let _rez:Array<QuestionResult>=[];

        for (const _q of this._CurrentTest.questions) {
            let _qr=new QuestionResult();
            _qr.id=_q.id;
            _qr.question=_q.question;
            _qr.answer_good=_q.answers.find(_a=>_a.id==_q.good_answ).answer;
            _qr.answer_user='';
            let _indx=this._choices[_q.id];
            if (_indx>0)
            {
                _qr.answer_user=_q.answers.find(_a=>_a.id==_indx).answer;
            }
            _rez.push(_qr);
        }

        return _rez;
    }


}



export   {TestState};